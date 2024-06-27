import { Router } from "express";
import { WebhookService } from "../services/WebhookService";
import { PositusService } from "../messaging/PositusService";
import { ImageService } from "../image/ImageService";

const router = Router();
const webhookService = new WebhookService(new PositusService());
const imageService = new ImageService();

router.post("/webhook", webhookService.receiveMessage);

router.get("/image/:id", imageService.renderImage)

export { router }