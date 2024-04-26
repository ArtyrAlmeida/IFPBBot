import { IMessagingService } from "./IMessagingService";

class PositusService implements IMessagingService {
    public sendMessage = async (message: string, to: string) => {
        const result = await this.positusRequest(message);
        return result;
    }

    public extractMessageData = (message: UserMessage) => { 
        return { 
            query: "", 
            to: "" 
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