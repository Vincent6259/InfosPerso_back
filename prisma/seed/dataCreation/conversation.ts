import { conversation, friendship, group } from "@prisma/client"
import { prisma } from "..";

const createConversations = async (groups: group[], friendships: friendship[]): Promise<conversation[]> => {
    const conversations: conversation[] = []

    for(let i = 0; i < groups.length; i++) {
        conversations.push(
            await prisma.conversation.create({
                data: {
                    created_at: new Date(),
                    updated_at: new Date(),
                    group_id: groups[i].id,
                    friendship_id: null
                }
            })
        )
    }

    for(let j = 0; j < friendships.length; j++) {
        conversations.push(
            await prisma.conversation.create({
                data: {
                    created_at: new Date(),
                    updated_at: new Date(),
                    group_id: null,
                    friendship_id: friendships[j].id
                }
            })
        )
    }

    return conversations
}

export default createConversations