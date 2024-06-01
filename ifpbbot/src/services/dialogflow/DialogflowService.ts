import dotenv from "dotenv";
dotenv.config();
import dialogflow, { SessionsClient } from "@google-cloud/dialogflow";
import { ProtobufField } from "../../types";

import { google } from "@google-cloud/dialogflow/build/protos/protos";

class DialogflowService {
    private sessionClient: SessionsClient;

    constructor() {
        this.sessionClient = new dialogflow.SessionsClient({
            credentials: {
                private_key: process.env.DF_PRIVATE_KEY.split(String.raw`\n`).join('\n').trim(),
                client_email: process.env.DF_CLIENT_EMAIL
            }
        });
    }

    detectIntent = async ({ to, message }: { to: string, message: string }) => {
        const request = {
            session: this.getSessionPath(to),
            queryInput: {
              text: {
                text: message,
                languageCode: "pt-br",
              },
            },
        };
        
        const response = await this.sessionClient.detectIntent(request);

        let queryResult = response[0].queryResult || {};
        if (!queryResult?.fulfillmentMessages) queryResult.fulfillmentMessages = [];

        queryResult.fulfillmentMessages = queryResult.fulfillmentMessages.map(message => {
            if (message.text?.text) return { singleText: message.text.text[0] };
            else if (message.payload) {
                return this.decodeProtobuff(message.payload as { fields: Record<string, ProtobufField> })
            }
            return {};
        });
        
        if (queryResult.action) queryResult = this.executeAction(queryResult);
        
        return queryResult;
    }

    private executeAction = (queryResult: google.cloud.dialogflow.v2.IQueryResult) => {
        const type = queryResult.parameters;
        return queryResult;
    }

    private getSessionPath = (session: string) => {
        return this.sessionClient.projectAgentSessionPath(
            process.env.DF_PROJECT_ID,
            session,
        );
    }

    private decodeProtobuff = (protobuff: { fields: Record<string, ProtobufField> }) => {
        const object: any = {};
        for (const field in protobuff.fields) {
            const value = protobuff.fields[field];
            switch (value.kind) {
                case "stringValue":
                    object[field] = value.stringValue;
                    break;
                case "numberValue":
                    object[field] = value.numberValue;
                    break;
                case "boolValue":
                    object[field] = value.boolValue;
                    break;
                case "listValue":
                    object[field] = value.listValue.values.map(value => this.decodeProtobuff(value));
                    break;
                case "structValue":
                    object[field] = this.decodeProtobuff(value.structValue);
                    break;
            }
        }
        return object;
    }
}

export { DialogflowService }