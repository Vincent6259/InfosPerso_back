"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const createUserFirstname = async (users) => {
    const userFirstnames = [];
    for (let i = 0; i < users.length; i++) {
        userFirstnames.push(await __1.prisma.user_data.create({
            data: {
                content: faker_1.faker.person.firstName(),
                user_id: users[i].id,
                label_id: 2,
                confidentiality: faker_1.faker.helpers.enumValue(client_1.confidentiality),
            }
        }));
    }
    return userFirstnames;
};
exports.default = createUserFirstname;
//# sourceMappingURL=userFirstname.js.map