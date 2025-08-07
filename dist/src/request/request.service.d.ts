import { PrismaService } from 'prisma/prisma.service';
export declare class RequestService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(UserId: number): Promise<{
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
