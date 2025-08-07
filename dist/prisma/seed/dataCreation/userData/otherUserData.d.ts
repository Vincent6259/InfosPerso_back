import { user_data, user, data_label } from '@prisma/client';
declare const createOtherUserData: (users: user[], dataLabels: data_label[]) => Promise<user_data[]>;
export default createOtherUserData;
