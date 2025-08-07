import { group, user } from "@prisma/client";
declare const createGroup: (number: number, users: user[]) => Promise<group[]>;
export default createGroup;
