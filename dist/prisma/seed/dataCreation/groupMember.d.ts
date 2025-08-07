import { group, group_member, user } from "@prisma/client";
declare const createGroupMember: (number: number, groups: group[], users: user[]) => Promise<group_member[]>;
export default createGroupMember;
