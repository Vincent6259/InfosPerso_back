"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const __1 = require("..");
const faker_1 = require("@faker-js/faker");
const createGroup = async (number, users) => {
    const groups = [];
    while (number) {
        const [groupCreator] = (0, utils_1.shuffleArray)(users);
        groups.push(await __1.prisma.group.create({
            data: {
                name: faker_1.faker.lorem.words({ min: 5, max: 10 }),
                description: faker_1.faker.lorem.words({ min: 10, max: 25 }),
                created_at: new Date(),
                updated_at: new Date(),
                creator_id: groupCreator.id,
            },
        }));
        number--;
    }
    return groups;
};
exports.default = createGroup;
//# sourceMappingURL=group.js.map