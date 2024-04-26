import dotenv from "dotenv";
dotenv.config();
import dialogflow, { SessionsClient } from "@google-cloud/dialogflow";

class DialogflowService {
    private sessionClient: SessionsClient;

    constructor() {
        console.log(process.env.DF_CLIENT_EMAIL)
        this.sessionClient = new dialogflow.SessionsClient({
            credentials: {
                private_key: process.env.DF_PRIVATE_KEY.split(String.raw`\n`).join('\n').trim(),
                client_email: process.env.DF_CLIENT_EMAIL
            }
        });
    }

    detectIntent = async (to: string, text: string) => {
        const request = {
            session: this.getSessionPath(to),
            queryInput: {
              text: {
                text,
                languageCode: "pt-br",
              },
            },
        };
        
        console.log("pre detect");
        
        const response = await this.sessionClient.detectIntent(request);
        console.log("pos detect")
        return response[0].queryResult?.fulfillmentMessages;

        return {
            to,  
            type: "text",  
            text: {      
                "body": text,
            }
        }

    }

    getSessionPath = (session: string) => {
        return this.sessionClient.projectAgentSessionPath(
            process.env.DF_PROJECT_ID,
            session,
        );
    }
}

export { DialogflowService }