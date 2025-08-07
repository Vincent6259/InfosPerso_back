"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const user_1 = require("./dataCreation/user");
const seedValues_1 = require("./seedValues");
const friendship_1 = require("./dataCreation/friendship");
const notification_1 = require("./dataCreation/notification");
const group_1 = require("./dataCreation/group");
const dataLabel_1 = require("./dataCreation/dataLabel");
const groupMember_1 = require("./dataCreation/groupMember");
const groupPermission_1 = require("./dataCreation/groupPermission");
const permission_1 = require("./dataCreation/permission");
const conversation_1 = require("./dataCreation/conversation");
const messages_1 = require("./dataCreation/messages");
const userData_1 = require("./dataCreation/userData");
exports.prisma = new client_1.PrismaClient();
async function main() {
    const dataLabels = await (0, dataLabel_1.default)();
    const users = await (0, user_1.default)(seedValues_1.default.usersAmount);
    const userDatas = await (0, userData_1.default)(users, dataLabels);
    const friendships = await (0, friendship_1.default)(seedValues_1.default.friendshipsAmount, users);
    const groups = await (0, group_1.default)(seedValues_1.default.groupsAmount, users);
    const conversations = await (0, conversation_1.default)(groups, friendships);
    const notifications = await (0, notification_1.default)(seedValues_1.default.notificationsAmount, users);
    const groupMembers = await (0, groupMember_1.default)(seedValues_1.default.groupMembersAmount, groups, users);
    const messages = await (0, messages_1.default)(seedValues_1.default.messagesAmount, conversations, groupMembers, friendships);
    const permissions = await (0, permission_1.default)(friendships, userDatas);
    const createGroupePermissions = await (0, groupPermission_1.default)(groups, dataLabels);
}
main()
    .then(async () => {
    await exports.prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await exports.prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=index.js.map