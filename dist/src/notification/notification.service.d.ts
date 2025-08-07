import { notification } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<notification>;
    findAllForUserLogin(userId: number): Promise<notification[]>;
    toggleIsRead(currentUserId: number, notificationId: number): Promise<notification | undefined>;
    remove(currentUserId: number, notificationId: number): Promise<notification | undefined>;
    private checkNotificationOwner;
}
