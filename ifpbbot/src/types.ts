type UserMessage = {
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