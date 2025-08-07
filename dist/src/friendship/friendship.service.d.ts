import { PrismaService } from 'prisma/prisma.service';
import { FriendRequestService } from 'src/friend_request/friend_request.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendDto } from './dto/friendInterface';
import { PatchConfidentialityDto } from './dto/patch-confidentiality.dto';
import { PatchFriendConfidentialityResult } from './dto/updateFriendInterface';
import { NotificationService } from 'src/notification/notification.service';
export declare class FriendshipService {
    private readonly prisma;
    private readonly friendshiprequest;
    private readonly notification;
    constructor(prisma: PrismaService, friendshiprequest: FriendRequestService, notification: NotificationService);
    create(requestId: number, user2Id: number, createFriendshipDto: CreateFriendshipDto): Promise<{
        id: number;
        user1_id: number;
        confidentiality_level_1: import("@prisma/client").$Enums.confidentiality;
        user2_id: number;
        confidentiality_level_2: import("@prisma/client").$Enums.confidentiality;
    }>;
    findAll(currentUserId: number): Promise<FriendDto[]>;
    findOne(currentUserId: number, friendId: number): Promise<Partial<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        content: string;
        user_id: number;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        label_id: number;
    }>[]>;
    patchFriendConfidentiality(currentUserId: number, dto: PatchConfidentialityDto): Promise<PatchFriendConfidentialityResult>;
}
