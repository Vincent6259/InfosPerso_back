import { $Enums, friendship, permission, user_data } from '@prisma/client';
import { prisma } from '..';

const createPermission = async (
  friendships: friendship[],
  userDatas: user_data[],
): Promise<permission[]> => {
  let permissions: permission[] = [];

  for (let i = 0; i < friendships.length; i++) {
    const friendshipPermissions = await populateFriendshipPermission(
      friendships[i],
      userDatas,
    );
    permissions = [...permissions, ...friendshipPermissions];
  }

  return permissions;
};

const populateFriendshipPermission = async (
  friendship: friendship,
  data: user_data[],
): Promise<permission[]> => {
  let permissions: permission[] = [];
  const firstPermissions = await generatePermission(
    friendship.user1_id,
    friendship.user2_id,
    friendship.confidentiality_level_1,
    data,
  );
  const secondPermissions = await generatePermission(
    friendship.user2_id,
    friendship.user1_id,
    friendship.confidentiality_level_2,
    data,
  );
  permissions = [...permissions, ...firstPermissions, ...secondPermissions];
  return permissions;
};

const generatePermission = async (
  senderId: number,
  receiverId: number,
  confidentiality: $Enums.confidentiality,
  data: user_data[],
): Promise<permission[]> => {
  const permissions: permission[] = [];

  const allowedData = data.filter(
    (d) =>
      d.user_id === senderId &&
      checkPermission(confidentiality, d.confidentiality),
  );

  for (let i = 0; i < allowedData.length; i++) {
    permissions.push(
      await prisma.permission.upsert({
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
      }),
    );
  }

  return permissions;
};

const checkPermission = (
  userPermission: $Enums.confidentiality,
  dataPermission: $Enums.confidentiality,
): boolean => {
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

export default createPermission;
