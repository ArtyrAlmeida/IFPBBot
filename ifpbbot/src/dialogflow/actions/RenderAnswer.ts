import ChartAnswer from "../../models/ChartAnswerModel";
import { BotOutgoingMessage } from "../../types";
import { IActionStrategy, TExecuteActionFunction } from "./IActionStrategy";

class RenderAnswer implements IActionStrategy {
    executeAction: TExecuteActionFunction = async (queryResult, query) => {
        const messages = queryResult.fulfillmentMessages as BotOutgoingMessage[];

        const imageMessage = messages[0];
        const chart = await ChartAnswer.findOne({ _id: query }, { name: 1 });

        if (imageMessage.type != "image" || !chart) return queryResult;

        imageMessage.image.link = `${process.env.HOST_ADDRESS}/image/${query}`;
        imageMessage.image.caption = chart.name;

        queryResult.fulfillmentMessages = [imageMessage as any];
        return queryResult;
    }
}

export { RenderAnswer }