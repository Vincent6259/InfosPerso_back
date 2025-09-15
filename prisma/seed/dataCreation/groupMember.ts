import { group, group_member, user } from "@prisma/client";
import { shuffleArray } from "../utils";
import { prisma } from "..";

const createGroupMember = async (number: number, groups: group[], users: user[]): Promise<group_member[]> => {
    const groupMembers: group_member[] = []

    for(let i = 0; i < groups.length; i++) {
        groupMembers.push(
            await prisma.group_member.create({
                data: {
                    group_id: groups[i].id,
                    user_id: groups[i].creator_id
                }
            })
        )
    }

    const [group] = shuffleArray<group>(groups);

    while(number) {
        const group_id = group.id
        const [user] = shuffleArray<user>(users.filter(user => user.id != group.creator_id));
        const user_id = user.id
        groupMembers.push(
            await prisma.group_member.upsert({
                where: { group_id_user_id: {
                    group_id,
                    user_id
                } },
                update: {},
                create: {
                    group_id,
                    user_id
                }
            })
        )
        number--
    }

    return groupMembers
}

export default createGroupMember