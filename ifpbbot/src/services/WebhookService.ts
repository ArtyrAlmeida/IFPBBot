import { RequestHandler } from "express";
import { DialogflowService } from "./DialogflowService";
import { IMessagingService } from "./messaging/IMessagingService";

class WebhookService {
    private messageClient: IMessagingService;
    private dialogFlowClient: DialogflowService;
    
    constructor(messageClient: IMessagingService) {
        this.messageClient = messageClient;
        this.dialogFlowClient = new DialogflowService();
    }

    public receiveMessage: RequestHandler = async (req, res) => {
        const incomingMessage: UserMessage = req.body;
        
        if (incomingMessage.statuses) return res.send("ok");
        if (incomingMessage.messages[0]!.type !== "text") return;
        
        const to = incomingMessage.contacts[0].wa_id;
        const message = incomingMessage.messages[0].text.body;
        
        const dfResponse = await this.dialogFlowClient.detectIntent(
            to, 
            message,
        );

        this.messageClient.sendMessage(JSON.stringify(dfResponse), to);
        res.send('ok');
    }
}



export { WebhookService }