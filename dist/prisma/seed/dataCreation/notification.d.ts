import { notification, user } from '@prisma/client';
declare const createNotification: (count: number, users: user[]) => Promise<notification[]>;
export default createNotification;
