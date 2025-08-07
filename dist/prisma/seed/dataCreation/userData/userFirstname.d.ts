import { user, user_data } from '@prisma/client';
declare const createUserFirstname: (users: user[]) => Promise<user_data[]>;
export default createUserFirstname;
