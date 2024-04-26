export interface IMessagingService {
    extractMessageData: (message: any) => { query: string, to: string };
    sendMessage: (message: string, receiver: string) => void;
}