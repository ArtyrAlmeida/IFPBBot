
import mongoose, { Schema } from "mongoose";
import { IChartAnswer } from "../types";

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

const ChartAnswer = mongoose.model("chart_answers", chartAnswerSchema);

export default ChartAnswer;
