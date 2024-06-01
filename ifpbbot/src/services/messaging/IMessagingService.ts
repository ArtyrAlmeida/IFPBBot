export interface IMessagingService {
    extractMessageData: (message: any) => { message: string, to: string };
    sendMessage: (messages: any[], receiver: string) => void;
}