"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const utils_1 = require("../../utils");
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const createOtherUserData = async (users, dataLabels) => {
    const [data_label] = (0, utils_1.shuffleArray)(dataLabels.filter(data => ![1, 2, 3, 4, 5].includes(data.id)));
    if (!data_label) {
        return [];
    }
    const userDatas = await Promise.all(users.map(async (user) => {
        return __1.prisma.user_data.create({
            data: {
                content: faker_1.faker.lorem.words({ min: 1, max: 5 }),
                user_id: user.id,
                label_id: data_label.id,
                confidentiality: faker_1.faker.helpers.enumValue(client_1.confidentiality),
            },
        });
    }));
    return userDatas.filter((data) => data !== null);
};
exports.default = createOtherUserData;
//# sourceMappingURL=otherUserData.js.map