import { user } from '@prisma/client';
declare const createUser: (number: number) => Promise<user[]>;
export default createUser;
