import { conversation } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
export interface IfindOneReturn {
    id: number;
    messages: {
        id: number;
        content: string;
        user: {
            id: number;
            tag: string;
            user_data: {
                content: string;
                data_label: {
                    label: string;
                };
            }[];
        };
    }[];
}
export declare class ConversationService {
    private prisma;
    constructor(prisma: PrismaService);
    createOne(currentUserId: number, dtoData: CreateConversationDto): Promise<conversation>;
    findOne(currentUserId: number, idConversation: number): Promise<IfindOneReturn | null>;
    deleteOne(currentUserId: number, idConversation: number): Promise<conversation>;
    private checkIfUserIsOwnerForCreate;
    private checkIfUserIsMemberForCreate;
    private checkIfUserIsMember;
    private checkConversationFriendshipOrOwner;
}
