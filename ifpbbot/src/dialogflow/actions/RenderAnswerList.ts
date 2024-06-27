import ChartAnswer from "../../models/ChartAnswerModel";
import { BotOutgoingMessage } from "../../types";
import { IActionStrategy, TExecuteActionFunction } from "./IActionStrategy";

class RenderAnswerList implements IActionStrategy {
    executeAction: TExecuteActionFunction = async (queryResult, query) => {
        const messages = queryResult.fulfillmentMessages as BotOutgoingMessage[];

        const listMessage = messages[0];
        if (listMessage.type != "interactive") return queryResult;
        
        const chartAnswers = await ChartAnswer.find({}, { name: 1, _id: 1 }).limit(10);

        listMessage.interactive.action.sections[0].rows = chartAnswers.map(chart => {
            return {
                id: chart.id!,
                description: "",
                title: chart.name
            }
        });

        queryResult.fulfillmentMessages = [listMessage as any];
        return queryResult;
    }
}

export { RenderAnswerList };