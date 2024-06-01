import { RequestHandler } from "express";
import { DialogflowService } from "./dialogflow/DialogflowService";
import { IMessagingService } from "./messaging/IMessagingService";
import { UserIncomingMessage } from "../types";
import { MessageModel } from "../models/MessageModel";

class WebhookService {
    private messageClient: IMessagingService;
    private dialogFlowClient: DialogflowService;
    
    constructor(messageClient: IMessagingService) {
        this.messageClient = messageClient;
        this.dialogFlowClient = new DialogflowService();
    }

    public receiveMessage: RequestHandler = async (req, res) => {
        const incomingMessage: UserIncomingMessage = req.body;
        
        if (incomingMessage.statuses) return res.send("ok");
        if (incomingMessage.messages[0]!.type !== "text") return;
        
        const messageData = this.messageClient.extractMessageData(incomingMessage);

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