"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const createUserAdress = async (users) => {
    const userAddresses = [];
    for (let i = 0; i < users.length; i++) {
        userAddresses.push(await __1.prisma.user_data.create({
            data: {
                content: faker_1.faker.location.streetAddress(),
                user_id: users[i].id,
                label_id: 4,
                confidentiality: faker_1.faker.helpers.enumValue(client_1.confidentiality),
            }
        }));
    }
    return userAddresses;
};
exports.default = createUserAdress;
//# sourceMappingURL=userAdress.js.map