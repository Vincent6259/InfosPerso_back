import { conversation, friendship, group_member, message } from "@prisma/client";
declare const createMessages: (number: number, conversations: conversation[], groupMembers: group_member[], friendships: friendship[]) => Promise<message[]>;
export default createMessages;
