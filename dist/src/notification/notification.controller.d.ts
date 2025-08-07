import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { notification } from '@prisma/client';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<notification>;
    findAllForUserLogin(request: AuthRequest): Promise<notification[]>;
    update(request: AuthRequest, notificationId: number): Promise<notification | undefined>;
    remove(request: AuthRequest, id: number): Promise<notification | undefined>;
}
