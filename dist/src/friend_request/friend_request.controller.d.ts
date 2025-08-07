import { FriendRequestService } from './friend_request.service';
import { CreateFriendRequestDto } from './dto/create-friend_request.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class FriendRequestController {
    private readonly friendRequestService;
    constructor(friendRequestService: FriendRequestService);
    create(createFriendRequestDto: CreateFriendRequestDto, req: AuthRequest): Promise<{
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
}
