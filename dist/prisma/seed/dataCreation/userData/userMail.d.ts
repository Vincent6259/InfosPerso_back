import { user, user_data } from '@prisma/client';
declare const createUserMail: (users: user[]) => Promise<user_data[]>;
export default createUserMail;
