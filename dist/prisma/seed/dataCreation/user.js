"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const __1 = require("..");
const argon2 = require("argon2");
const createUser = async (number) => {
    const users = [];
    while (number) {
        const tag = faker_1.faker.string.alphanumeric(10);
        const randomPassword = 'Password123!';
        const hashedPassword = await argon2.hash(randomPassword);
        users.push(await __1.prisma.user.upsert({
            where: { tag },
            update: {},
            create: {
                tag,
                hashRefreshToken: '',
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date(),
            },
        }));
        number--;
    }
    return users;
};
exports.default = createUser;
//# sourceMappingURL=user.js.map