"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const createPermission = async (friendships, userDatas) => {
    let permissions = [];
    for (let i = 0; i < friendships.length; i++) {
        const friendshipPermissions = await populateFriendshipPermission(friendships[i], userDatas);
        permissions = [...permissions, ...friendshipPermissions];
    }
    return permissions;
};
const populateFriendshipPermission = async (friendship, data) => {
    let permissions = [];
    const firstPermissions = await generatePermission(friendship.user1_id, friendship.user2_id, friendship.confidentiality_level_1, data);
    const secondPermissions = await generatePermission(friendship.user2_id, friendship.user1_id, friendship.confidentiality_level_2, data);
    permissions = [...permissions, ...firstPermissions, ...secondPermissions];
    return permissions;
};
const generatePermission = async (senderId, receiverId, confidentiality, data) => {
    const permissions = [];
    const allowedData = data.filter((d) => d.user_id === senderId &&
        checkPermission(confidentiality, d.confidentiality));
    for (let i = 0; i < allowedData.length; i++) {
        permissions.push(await __1.prisma.permission.upsert({
            where: {
                sender_id_receiver_id_user_data_id: {
                    sender_id: senderId,
                    receiver_id: receiverId,
                    user_data_id: allowedData[i].id,
                },
            },
            update: {},
            create: {
                created_at: new Date(),
                updated_at: new Date(),
                sender_id: senderId,
                receiver_id: receiverId,
                user_data_id: allowedData[i].id,
            },
        }));
    }
    return permissions;
};
const checkPermission = (userPermission, dataPermission) => {
    switch (userPermission) {
        case 'MAXIMUM':
            return true;
        case 'CRITICAL':
            return dataPermission != 'MAXIMUM';
        case 'MIDDLING':
            return dataPermission === 'MIDDLING' || dataPermission === 'MINIMUM';
        case 'MINIMUM':
            return dataPermission === 'MINIMUM';
    }
};
exports.default = createPermission;
//# sourceMappingURL=permission.js.map