import { CreateFriendRequestDto } from './dto/create-friend_request.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class FriendRequestService {
    private readonly prisma;
    private readonly notification;
    constructor(prisma: PrismaService, notification: NotificationService);
    create(createFriendRequestDto: CreateFriendRequestDto, user1Id: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        sender_id: number;
        receiver_id: number;
    }>;
    remove(requestId: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
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
