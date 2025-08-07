"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevel = getLevel;
const client_1 = require("@prisma/client");
const levels = [
    client_1.confidentiality.MAXIMUM,
    client_1.confidentiality.CRITICAL,
    client_1.confidentiality.MIDDLING,
    client_1.confidentiality.MINIMUM,
];
function getLevel(level) {
    const index = levels.indexOf(level);
    if (index < 0)
        return [];
    return levels.slice(index);
}
//# sourceMappingURL=confidentiality_array.js.map