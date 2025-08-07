"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ConversationService = class ConversationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOne(currentUserId, dtoData) {
        if ((dtoData.group_id && dtoData.friendship_id) ||
            (!dtoData.group_id && !dtoData.friendship_id)) {
            throw new common_1.HttpException('Bad request DTO, Create Conversation', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (dtoData.group_id) {
            if (await this.checkIfUserIsOwnerForCreate(dtoData.group_id, currentUserId)) {
                return this.prisma.conversation.create({
                    data: {
                        group_id: dtoData.group_id,
                    },
                });
            }
            else {
                throw new common_1.HttpException('You are not the owner of this group!', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else if (dtoData.friendship_id) {
            if (await this.checkIfUserIsMemberForCreate(dtoData.friendship_id, currentUserId)) {
                return this.prisma.conversation.create({
                    data: {
                        friendship_id: dtoData.friendship_id,
                    },
                });
            }
            else {
                throw new common_1.HttpException('You are not a member of this friendship!', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else {
            throw new common_1.HttpException('Bad request DTO, Create Conversation', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(currentUserId, idConversation) {
        if (await this.checkIfUserIsMember(idConversation, currentUserId)) {
            return this.prisma.conversation.findUnique({
                where: { id: idConversation },
                select: {
                    id: true,
                    messages: {
                        select: {
                            id: true,
                            content: true,
                            user: {
                                select: {
                                    id: true,
                                    tag: true,
                                    user_data: {
                                        where: { label_id: { in: [1, 2] } },
                                        select: {
                                            content: true,
                                            data_label: { select: { label: true } },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        }
        else {
            throw new common_1.HttpException('You are not a member of this conversation!', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async deleteOne(currentUserId, idConversation) {
        if (await this.checkConversationFriendshipOrOwner(idConversation, currentUserId)) {
            await this.prisma.message.deleteMany({
                where: { conversation_id: idConversation },
            });
            return await this.prisma.conversation.delete({
                where: { id: idConversation },
            });
        }
        else {
            throw new common_1.HttpException('You are not a member or the owner of this conversation!', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkIfUserIsOwnerForCreate(idGroup, currentUserId) {
        const group = await this.prisma.group.findUnique({
            where: {
                id: idGroup,
                creator_id: currentUserId,
            },
        });
        if (group) {
            return true;
        }
        else {
            return false;
        }
    }
    async checkIfUserIsMemberForCreate(idFriendship, currentUserId) {
        const friendship = await this.prisma.friendship.findUnique({
            where: {
                id: idFriendship,
                OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
            },
        });
        if (friendship) {
            return true;
        }
        else {
            return false;
        }
    }
    async checkIfUserIsMember(idConversation, currentUserId) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: idConversation },
            select: {
                friendship: {
                    where: {
                        OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
                    },
                },
                group: {
                    where: {
                        group_members: {
                            some: {
                                user_id: currentUserId,
                            },
                        },
                    },
                },
            },
        });
        if (conversation?.group || conversation?.friendship) {
            return true;
        }
        else {
            return false;
        }
    }
    async checkConversationFriendshipOrOwner(idConversation, currentUserId) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: idConversation },
            select: {
                friendship: {
                    where: {
                        OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
                    },
                },
                group: {
                    where: {
                        creator_id: currentUserId,
                    },
                },
            },
        });
        if (conversation?.group || conversation?.friendship) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map