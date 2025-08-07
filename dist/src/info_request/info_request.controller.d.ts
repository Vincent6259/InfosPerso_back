import { InfoRequestService } from './info_request.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { CreateInfoRequestDto } from './dto/create-info_request.dto';
export declare class InfoRequestController {
    private readonly infoRequestService;
    constructor(infoRequestService: InfoRequestService);
    create(req: AuthRequest, dto: CreateInfoRequestDto): Promise<{
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
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        sender_id: number;
        receiver_id: number;
    }>;
}
