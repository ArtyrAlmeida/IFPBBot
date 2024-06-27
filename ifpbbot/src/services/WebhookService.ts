import { RequestHandler } from "express";
import { DialogflowClient } from "../dialogflow/DialogflowClient";
import { IMessagingService } from "../messaging/IMessagingService";
import { UserIncomingMessage } from "../types";
import { MessageModel } from "../models/MessageModel";

class WebhookService {
    private messageClient: IMessagingService;
    private dialogFlowClient: DialogflowClient;
    
    constructor(messageClient: IMessagingService) {
        this.messageClient = messageClient;
        this.dialogFlowClient = new DialogflowClient();
    }

    public receiveMessage: RequestHandler = async (req, res) => {
        const incomingMessage: UserIncomingMessage = req.body;
        
        if (incomingMessage.statuses) return res.send("ok");
        
        const messageData = this.messageClient.extractMessageData(incomingMessage);

        console.log(messageData);
        

        const dfResponse = await this.dialogFlowClient.detectIntent(messageData);

        MessageModel.create({
            intent: dfResponse.intent?.displayName,
            phoneNumber: messageData.to,
            userQuery: messageData.message
        }) 

        this.messageClient.sendMessage(dfResponse.fulfillmentMessages!, messageData.to);
        res.send('ok');
    }
}



export { WebhookService }