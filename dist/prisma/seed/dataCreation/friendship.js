"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const utils_1 = require("../utils");
const __1 = require("..");
const faker_1 = require("@faker-js/faker");
const createFriendship = async (number, users) => {
    const friendships = [];
    while (number) {
        const [user1, user2] = (0, utils_1.shuffleArray)(users);
        if (user1.id > user2.id) {
            const biggerId = user1.id;
            user1.id = user2.id;
            user2.id = biggerId;
        }
        if (friendships.find(friendship => friendship.user1_id === user1.id && friendship.user2_id === user2.id)) {
            continue;
        }
        else {
            friendships.push(await __1.prisma.friendship.create({
                data: {
                    user1_id: user1.id,
                    confidentiality_level_1: faker_1.faker.helpers.enumValue(client_1.confidentiality),
                    user2_id: user2.id,
                    confidentiality_level_2: faker_1.faker.helpers.enumValue(client_1.confidentiality),
                },
            }));
            number--;
        }
    }
    return friendships;
};
exports.default = createFriendship;
//# sourceMappingURL=friendship.js.map