import { FriendshipService } from './friendship.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendDto } from './dto/friendInterface';
import { PatchConfidentialityDto } from './dto/patch-confidentiality.dto';
import { PatchFriendConfidentialityResult } from './dto/updateFriendInterface';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    create(req: AuthRequest, requestId: number, dto: CreateFriendshipDto): Promise<{
        id: number;
        user1_id: number;
        confidentiality_level_1: import("@prisma/client").$Enums.confidentiality;
        user2_id: number;
        confidentiality_level_2: import("@prisma/client").$Enums.confidentiality;
    }>;
    findAll(request: AuthRequest): Promise<FriendDto[]>;
    findOne(request: AuthRequest, friendId: number): Promise<Partial<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        content: string;
        user_id: number;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        label_id: number;
    }>[]>;
    patchFriendConfidentiality(request: AuthRequest, dto: PatchConfidentialityDto): Promise<PatchFriendConfidentialityResult>;
}
