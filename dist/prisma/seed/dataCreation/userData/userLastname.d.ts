import { user, user_data } from '@prisma/client';
declare const createUserLastname: (users: user[]) => Promise<user_data[]>;
export default createUserLastname;
