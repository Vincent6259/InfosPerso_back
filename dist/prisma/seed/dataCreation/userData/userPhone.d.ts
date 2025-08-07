import { user, user_data } from '@prisma/client';
declare const createUserPhone: (users: user[]) => Promise<user_data[]>;
export default createUserPhone;
