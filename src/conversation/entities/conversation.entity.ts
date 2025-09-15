export type message = {
    content : string,
    created_at : string,
    updated_at:string,
    author : string
}

export enum ConvType {
    group = "group",
    friend = "friend"
}

export class Conversation {
    id : string;
    type : ConvType;
    members : string[];
    messages : message[];
}
