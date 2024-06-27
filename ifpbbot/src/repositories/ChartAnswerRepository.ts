import ChartAnswer from "../models/ChartAnswerModel"

class ChartAnswerRepository {
    public getChartAnswerInfo = async () => {
        const answers = await ChartAnswer.find({}, { name: 1, _id: 1 });
        return answers;
    }

    public getData = async (_id: string) => {
        const answer = await ChartAnswer.findOne({ _id });
        return answer;
    }
}