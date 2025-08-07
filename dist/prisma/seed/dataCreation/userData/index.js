"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userLastname_1 = require("./userLastname");
const userFirstname_1 = require("./userFirstname");
const userMail_1 = require("./userMail");
const userAdress_1 = require("./userAdress");
const userPhone_1 = require("./userPhone");
const otherUserData_1 = require("./otherUserData");
const createUserData = async (users, dataLabels) => {
    const allUserDatas = [];
    const usersFirstnames = await (0, userFirstname_1.default)(users);
    allUserDatas.push(...usersFirstnames);
    const usersLastnames = await (0, userLastname_1.default)(users);
    allUserDatas.push(...usersLastnames);
    const usersMails = await (0, userMail_1.default)(users);
    allUserDatas.push(...usersMails);
    const userAddresses = await (0, userAdress_1.default)(users);
    allUserDatas.push(...userAddresses);
    const userPhones = await (0, userPhone_1.default)(users);
    allUserDatas.push(...userPhones);
    const otherUserDatas = await (0, otherUserData_1.default)(users, dataLabels);
    allUserDatas.push(...otherUserDatas);
    return allUserDatas;
};
exports.default = createUserData;
//# sourceMappingURL=index.js.map