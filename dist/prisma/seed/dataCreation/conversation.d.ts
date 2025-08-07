import { conversation, friendship, group } from "@prisma/client";
declare const createConversations: (groups: group[], friendships: friendship[]) => Promise<conversation[]>;
export default createConversations;
