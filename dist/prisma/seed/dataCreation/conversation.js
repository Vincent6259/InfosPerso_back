"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const createConversations = async (groups, friendships) => {
    const conversations = [];
    for (let i = 0; i < groups.length; i++) {
        conversations.push(await __1.prisma.conversation.create({
            data: {
                created_at: new Date(),
                updated_at: new Date(),
                group_id: groups[i].id,
                friendship_id: null
            }
        }));
    }
    for (let j = 0; j < friendships.length; j++) {
        conversations.push(await __1.prisma.conversation.create({
            data: {
                created_at: new Date(),
                updated_at: new Date(),
                group_id: null,
                friendship_id: friendships[j].id
            }
        }));
    }
    return conversations;
};
exports.default = createConversations;
//# sourceMappingURL=conversation.js.map