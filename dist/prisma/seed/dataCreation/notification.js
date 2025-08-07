"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const __1 = require("..");
const faker_1 = require("@faker-js/faker");
const createNotification = async (count, users) => {
    const notifications = [];
    while (count) {
        const [user] = (0, utils_1.shuffleArray)(users);
        notifications.push(await __1.prisma.notification.create({
            data: {
                content: faker_1.faker.lorem.lines(1),
                is_read: faker_1.faker.datatype.boolean(),
                created_at: new Date(),
                updated_at: new Date(),
                user_id: user.id,
            },
        }));
        count--;
    }
    return notifications;
};
exports.default = createNotification;
//# sourceMappingURL=notification.js.map