"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const createUserLastname = async (users) => {
    const userLastnames = [];
    for (let i = 0; i < users.length; i++) {
        userLastnames.push(await __1.prisma.user_data.create({
            data: {
                content: faker_1.faker.person.lastName(),
                user_id: users[i].id,
                label_id: 1,
                confidentiality: faker_1.faker.helpers.enumValue(client_1.confidentiality),
            }
        }));
    }
    return userLastnames;
};
exports.default = createUserLastname;
//# sourceMappingURL=userLastname.js.map