import { PrismaService } from 'prisma/prisma.service';
import { InfoRequestService } from 'src/info_request/info_request.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class PermissionService {
    private readonly prisma;
    private readonly infoRequestService;
    private readonly notification;
    constructor(prisma: PrismaService, infoRequestService: InfoRequestService, notification: NotificationService);
    create(requestId: number, user2Id: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        user_data_id: number | null;
        sender_id: number;
        receiver_id: number;
        card_id: number | null;
    }>;
}
