"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const createUserMail = async (users) => {
    const userMails = [];
    for (let i = 0; i < users.length; i++) {
        userMails.push(await __1.prisma.user_data.create({
            data: {
                content: faker_1.faker.internet.email(),
                user_id: users[i].id,
                label_id: 3,
                confidentiality: faker_1.faker.helpers.enumValue(client_1.confidentiality),
            }
        }));
    }
    return userMails;
};
exports.default = createUserMail;
//# sourceMappingURL=userMail.js.map