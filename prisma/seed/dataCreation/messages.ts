import { conversation, friendship, group_member, message } from "@prisma/client";
import { shuffleArray } from "../utils";
import { prisma } from "..";
import { faker } from "@faker-js/faker";

const createMessages = async (number: number, conversations: conversation[], groupMembers: group_member[], friendships: friendship[]): Promise<message[]> => {
    const messages: message[] = []
    while(number) {
        const [conversation] = shuffleArray(conversations);

        let author_id: number = 0

        if(conversation.group_id) {
            author_id = shuffleArray(groupMembers.filter(group => group.group_id === conversation.group_id))[0].user_id
        }

        else if(conversation.friendship_id) {
            const friendship = friendships.find(friendship => friendship.id === conversation.friendship_id)
            if(friendship) {
                if(Math.random() < 0.5) {
                    author_id = friendship.user1_id
                }
                else author_id = friendship.user2_id
            }
        }

        messages.push(
            await prisma.message.create({
                data: {
                    content: faker.lorem.words({ min: 4, max: 20 }),
                    created_at: new Date(),
                    updated_at: new Date(),
                    conversation_id: conversation.id,
                    author_id
                }
            })
        )

        number--
    }
    return messages
}

export default createMessages