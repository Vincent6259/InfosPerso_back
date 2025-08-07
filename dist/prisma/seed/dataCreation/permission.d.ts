import { friendship, permission, user_data } from '@prisma/client';
declare const createPermission: (friendships: friendship[], userDatas: user_data[]) => Promise<permission[]>;
export default createPermission;
