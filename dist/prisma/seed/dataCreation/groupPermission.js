"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const __1 = require("..");
const createGroupPermission = async (groups, dataLabels) => {
    const groupPermissions = [];
    for (let i = 0; i < groups.length; i++) {
        const [randomData] = (0, utils_1.shuffleArray)(dataLabels);
        const newPermission = await __1.prisma.group_permission.create({
            data: {
                group_id: groups[i].id,
                data_label_id: randomData.id,
            }
        });
        groupPermissions.push(newPermission);
    }
    return groupPermissions;
};
exports.default = createGroupPermission;
//# sourceMappingURL=groupPermission.js.map