import { friendship, user } from '@prisma/client';
declare const createFriendship: (number: number, users: user[]) => Promise<friendship[]>;
export default createFriendship;
