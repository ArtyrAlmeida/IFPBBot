import { google } from "@google-cloud/dialogflow/build/protos/protos";
import { IActionStrategy } from "./actions/IActionStrategy";
import { DialogflowClient } from "./DialogflowClient";

class DialogflowAction {
    private strategy: IActionStrategy;
    private dialogflowClient: DialogflowClient;

    constructor (strategy: IActionStrategy, dialogflowClient: DialogflowClient) {
        this.strategy = strategy;
        this.dialogflowClient = dialogflowClient;
    }

    executeAction = (queryResult: google.cloud.dialogflow.v2.IQueryResult, query: string) => {
        return this.strategy.executeAction(queryResult, query);
    }
}

export { DialogflowAction }