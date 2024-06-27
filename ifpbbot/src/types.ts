export type ActionName = "renderAnswerList" | "renderAnswer";

export type User = {
    phoneNumber: string;
    name: string;
}

export type Message = {
    phoneNumber: string;
    userQuery: string;
    intent: string;

}

export type UserIncomingMessage = {
    contacts: [{
        profile: { name: string },
        wa_id: string,
    }],
    messages: [{
        from: string,
        id: string,
        timestamp: number,
        
    } & UserMessageFields],
    statuses?: any[]
}

type UserMessageFields = TextMessageFields | InteractiveMessageFields;

type TextMessageFields = {
    type: "text"
    text: { body: string }
}

type InteractiveMessageFields = {
    type: "interactive"
    interactive: ListReply | ButtonReply
}

type ListReply = {
    type: "list_reply" ,
    list_reply: InteractiveMessageFieldsReply
}

type ButtonReply = {
    type: "button_reply",
    button_reply: InteractiveMessageFieldsReply
}

type InteractiveMessageFieldsReply = {
    id: string;
    title: string
    description: string;
}

export type BotOutgoingMessage = {
    to: string;
} & BotMessageFiels;

type BotMessageFiels = TextMessageFields | BotOutgoingListMessageFields | BotOutgoingImageMessageFields;

type BotOutgoingListMessageFields = {
    type: "interactive",
    interactive: {
        header: {
            type: "text",
            text: string,
        },
        action: {
            sections: { 
                title: string,
                rows: InteractiveMessageFieldsReply[]
            }[];
            button: string;
        },
        type: "list",
        body: {
            text: string;
        },
        footer?: {
            text: string;
        }
    }
}

type BotOutgoingImageMessageFields = {
    type: "image";
    image: {
        link: string;
        caption: string;
    }
}

export type ProtobufField = {
    kind: "structValue",
    structValue: {
        fields: { [key: string]: ProtobufField }
    },
} | {
    kind: "stringValue",
    stringValue: string,
} | {
    kind: "numberValue",
    numberValue: number,
} | {
    kind: "listValue",
    listValue: {
        values: ProtobufField[]
    }
} | {
    kind: "boolValue",
    boolValue: boolean
}

export interface IChartAnswer {
    name: string;
    data: Buffer;
    contentType: string;
    _id?: string;
}

