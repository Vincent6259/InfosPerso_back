"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const __1 = require("..");
const faker_1 = require("@faker-js/faker");
const createMessages = async (number, conversations, groupMembers, friendships) => {
    const messages = [];
    while (number) {
        const [conversation] = (0, utils_1.shuffleArray)(conversations);
        let author_id = 0;
        if (conversation.group_id) {
            author_id = (0, utils_1.shuffleArray)(groupMembers.filter(group => group.group_id === conversation.group_id))[0].user_id;
        }
        else if (conversation.friendship_id) {
            const friendship = friendships.find(friendship => friendship.id === conversation.friendship_id);
            if (friendship) {
                if (Math.random() < 0.5) {
                    author_id = friendship.user1_id;
                }
                else
                    author_id = friendship.user2_id;
            }
        }
        messages.push(await __1.prisma.message.create({
            data: {
                content: faker_1.faker.lorem.words({ min: 4, max: 20 }),
                created_at: new Date(),
                updated_at: new Date(),
                conversation_id: conversation.id,
                author_id
            }
        }));
        number--;
    }
    return messages;
};
exports.default = createMessages;
//# sourceMappingURL=messages.js.map