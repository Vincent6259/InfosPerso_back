export type message = {
    content: string;
    created_at: string;
    updated_at: string;
    author: string;
};
export declare enum ConvType {
    group = "group",
    friend = "friend"
}
export declare class Conversation {
    id: string;
    type: ConvType;
    members: string[];
    messages: message[];
}
