import { PermissionService } from './permission.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(req: AuthRequest, requestId: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        user_data_id: number | null;
        sender_id: number;
        receiver_id: number;
        card_id: number | null;
    }>;
}
