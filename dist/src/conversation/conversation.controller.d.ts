import { ConversationService } from './conversation.service';
import { IfindOneReturn } from './conversation.service';
import { conversation } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    createOne(request: AuthRequest, dtoData: CreateConversationDto): Promise<conversation>;
    findOne(request: AuthRequest, idConversation: number): Promise<IfindOneReturn | null>;
    deleteOne(request: AuthRequest, idConversation: number): Promise<conversation>;
}
