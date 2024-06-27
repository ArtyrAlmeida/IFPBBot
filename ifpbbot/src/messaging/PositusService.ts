import { UserIncomingMessage } from "../types";
import { IMessagingService } from "./IMessagingService";

class PositusService implements IMessagingService {
    public sendMessage = async (messages: any[], to: string) => {
        const messagesToSend = messages.map(message => {
            if (message.singleText) {
                return JSON.stringify({
                    to,
                    type: "text",
                    text: {
                        body: message.singleText,
                    },
                })
            }
            else return JSON.stringify(message).replace("USER_PHONENUMBER", to);
        });

        messagesToSend.forEach(await (async message => {
            const result = await this.positusRequest(message);
            console.log(await result.json());
            
            return result;
        }))
    }

    public extractMessageData = (incomingMessage: UserIncomingMessage) => { 
        let message: string = "";
        if (incomingMessage.messages[0].type == "text") message = incomingMessage.messages[0].text!.body;
        else {
            if (incomingMessage.messages[0].interactive.type == "button_reply") message = incomingMessage.messages[0].interactive.button_reply.id;
            else message = incomingMessage.messages[0].interactive.list_reply.id;
        }
        return { 
            message, 
            to:  incomingMessage.contacts[0].wa_id
        } 
    };

    private positusRequest = async (body: string) => {
        console.log(body);
        
        const result = await fetch(process.env.POSITUS_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.POSITUS_TOKEN,
            },
            body,
        });

        console.log(result.status);
        
        return result;
    }
}

export { PositusService }