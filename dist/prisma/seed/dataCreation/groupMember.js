"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const __1 = require("..");
const createGroupMember = async (number, groups, users) => {
    const groupMembers = [];
    for (let i = 0; i < groups.length; i++) {
        groupMembers.push(await __1.prisma.group_member.create({
            data: {
                group_id: groups[i].id,
                user_id: groups[i].creator_id
            }
        }));
    }
    const [group] = (0, utils_1.shuffleArray)(groups);
    while (number) {
        const group_id = group.id;
        const [user] = (0, utils_1.shuffleArray)(users.filter(user => user.id != group.creator_id));
        const user_id = user.id;
        groupMembers.push(await __1.prisma.group_member.upsert({
            where: { group_id_user_id: {
                    group_id,
                    user_id
                } },
            update: {},
            create: {
                group_id,
                user_id
            }
        }));
        number--;
    }
    return groupMembers;
};
exports.default = createGroupMember;
//# sourceMappingURL=groupMember.js.map