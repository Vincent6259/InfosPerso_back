import { RequestService } from './request.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class RequestController {
    private readonly requestService;
    constructor(requestService: RequestService);
    findAll(req: AuthRequest): Promise<{
        friendRequets: {
            user_sender: {
                tag: string;
            };
        }[];
        infosRequests: {
            user_sender: {
                tag: string;
            };
        }[];
    }>;
}
