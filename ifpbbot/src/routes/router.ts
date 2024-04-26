import { Router } from "express";
import { WebhookService } from "../services/WebhookService";
import { PositusService } from "../services/messaging/PositusService";

const messageService = new PositusService();

const router = Router();
const webhookService = new WebhookService(messageService);

router.post("/webhook", webhookService.receiveMessage)

export { router }