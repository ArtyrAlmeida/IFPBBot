import { IChartAnswer } from "@/interfaces";
import mongoose, { Schema } from "mongoose";

const chartAnswerSchema = new Schema<IChartAnswer>({
    name: {
        type: String
    },
    data: {
        type: Buffer
    },
    contentType: {
        type: String
    }
});

const ChartAnswer = mongoose.models?.chart_answers || mongoose.model("chart_answers", chartAnswerSchema);

export default ChartAnswer;
