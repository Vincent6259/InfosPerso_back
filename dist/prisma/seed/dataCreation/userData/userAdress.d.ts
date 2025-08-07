import { user, user_data } from '@prisma/client';
declare const createUserAdress: (users: user[]) => Promise<user_data[]>;
export default createUserAdress;
