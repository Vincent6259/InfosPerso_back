import { data_label, group, group_permission } from "@prisma/client";
declare const createGroupPermission: (groups: group[], dataLabels: data_label[]) => Promise<group_permission[]>;
export default createGroupPermission;
