"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateUniqueTag;
const nanoid_1 = require("nanoid");
async function generateUniqueTag(prisma) {
    let tag = '';
    let exists = true;
    const maxtries = 100;
    let tries = 0;
    while (exists && tries < maxtries) {
        tag = (0, nanoid_1.nanoid)(5);
        const existingUser = await prisma.user.findUnique({
            where: { tag },
        });
        exists = !!existingUser;
        tries++;
    }
    return tag;
}
//# sourceMappingURL=generateTag.js.map