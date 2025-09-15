import { data_label, group, group_permission } from "@prisma/client";
import { shuffleArray } from "../utils";
import { prisma } from "..";

const createGroupPermission = async (groups: group[], dataLabels: data_label[]): Promise<group_permission[]> => {
    const groupPermissions: group_permission[] = [];

    for (let i = 0; i < groups.length; i++) {
        const [randomData] = shuffleArray<data_label>(dataLabels);

            const newPermission = await prisma.group_permission.create ({
                data: {
                    group_id: groups[i].id,
                    data_label_id: randomData.id,
                }
            });
            groupPermissions.push(newPermission)

    }

    return groupPermissions;
}

export default createGroupPermission;