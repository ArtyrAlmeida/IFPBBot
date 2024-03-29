import { ITextAnswer } from "@/interfaces";
import mongoose, { Schema } from "mongoose";

const textAnswerSchema = new Schema<ITextAnswer>({
    name: {
        type: String
    },
    text: {
        type: String
    },
});

const TextAnswer = mongoose.models.text_answers || mongoose.model("text_answers", textAnswerSchema);

export default TextAnswer;
