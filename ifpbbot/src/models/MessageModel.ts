import { Schema, model } from "mongoose";
import { Message } from "../types";

const messageSchema = new Schema<Message>({
    phoneNumber: {
        type: String,
        required: true,       
    },
    intent: {
        type: String,
        required: true,
    },
    userQuery: {
        type: String,
        required: true,
    }
});

const MessageModel = model("messages", messageSchema);

export { MessageModel }