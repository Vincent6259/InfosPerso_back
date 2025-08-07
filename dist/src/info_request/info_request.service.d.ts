import { PrismaService } from 'prisma/prisma.service';
import { CreateInfoRequestDto } from './dto/create-info_request.dto';
import { NotificationService } from 'src/notification/notification.service';
export declare class InfoRequestService {
    private readonly prisma;
    private readonly notification;
    constructor(prisma: PrismaService, notification: NotificationService);
    create(user1Id: number, dto: CreateInfoRequestDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        user_data_id: number;
        sender_id: number;
        receiver_id: number;
    }>;
    remove(requestId: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        user_data_id: number;
        sender_id: number;
        receiver_id: number;
    }>;
    requestRefused(requestId: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        sender_id: number;
        receiver_id: number;
    }>;
}
