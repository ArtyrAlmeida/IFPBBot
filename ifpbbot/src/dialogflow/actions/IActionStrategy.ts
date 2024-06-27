import { google } from "@google-cloud/dialogflow/build/protos/protos";

type TExecuteActionFunction = (queryResult: google.cloud.dialogflow.v2.IQueryResult, query: string) =>  Promise<google.cloud.dialogflow.v2.IQueryResult>;

interface IActionStrategy {
    executeAction: TExecuteActionFunction;
}

export { IActionStrategy, TExecuteActionFunction }