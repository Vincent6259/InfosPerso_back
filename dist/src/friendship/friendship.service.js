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
exports.FriendshipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const friend_request_service_1 = require("../friend_request/friend_request.service");
const confidentiality_array_1 = require("./confidentiality_array");
const notification_service_1 = require("../notification/notification.service");
let FriendshipService = class FriendshipService {
    prisma;
    friendshiprequest;
    notification;
    constructor(prisma, friendshiprequest, notification) {
        this.prisma = prisma;
        this.friendshiprequest = friendshiprequest;
        this.notification = notification;
    }
    async create(requestId, user2Id, createFriendshipDto) {
        const { confidentiality } = createFriendshipDto;
        const request = await this.prisma.friend_request.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.BadRequestException(`Request not found`);
        }
        if (request.receiver_id !== user2Id) {
            throw new common_1.ForbiddenException(`Not allowed to accept this request`);
        }
        const user1Id = request.sender_id;
        let user1_id;
        let user2_id;
        let confidentiality_level_1;
        let confidentiality_level_2;
        if (user1Id < user2Id) {
            user1_id = user1Id;
            user2_id = user2Id;
            confidentiality_level_1 = confidentiality;
            confidentiality_level_2 = request.confidentiality;
        }
        else {
            user1_id = user2Id;
            user2_id = user1Id;
            confidentiality_level_1 = request.confidentiality;
            confidentiality_level_2 = confidentiality;
        }
        const newFriendship = await this.prisma.friendship.create({
            data: {
                user1_id,
                user2_id,
                confidentiality_level_1,
                confidentiality_level_2,
            },
        });
        const allowed1 = (0, confidentiality_array_1.getLevel)(confidentiality);
        const allowed2 = (0, confidentiality_array_1.getLevel)(request.confidentiality);
        let findData1;
        findData1 = await this.prisma.user_data.findMany({
            where: { user_id: user1Id, confidentiality: { in: allowed1 } },
        });
        if (findData1.length === 0) {
            throw new common_1.BadRequestException('data not find');
        }
        let findData2;
        findData2 = await this.prisma.user_data.findMany({
            where: { user_id: user2Id, confidentiality: { in: allowed2 } },
        });
        if (findData2.length === 0) {
            throw new common_1.BadRequestException('data not find');
        }
        const createPermissions = [
            ...findData1.map((f) => ({
                user_data_id: f.id,
                sender_id: user2Id,
                receiver_id: user1Id,
            })),
            ...findData2.map((f) => ({
                user_data_id: f.id,
                sender_id: user1Id,
                receiver_id: user2Id,
            })),
        ];
        await this.prisma.permission.createMany({
            data: createPermissions,
            skipDuplicates: true,
        });
        await this.friendshiprequest.remove(requestId);
        const newNotification = {
            user_id: request.sender_id,
            content: "Votre demande d'amitie a ete acceptee",
        };
        await this.notification.create(newNotification);
        return newFriendship;
    }
    async findAll(currentUserId) {
        const allFriendships = await this.prisma.friendship.findMany({
            where: {
                OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
            },
            select: {
                user1_id: true,
                user2_id: true,
                confidentiality_level_1: true,
                confidentiality_level_2: true,
                user_sender: {
                    select: {
                        tag: true,
                        id: true,
                        user_data: {
                            where: { label_id: { in: [1, 2] } },
                            select: { id: true, label_id: true, content: true },
                        },
                    },
                },
                user_receiver: {
                    select: {
                        id: true,
                        tag: true,
                        user_data: {
                            where: { label_id: { in: [1, 2] } },
                            select: { id: true, label_id: true, content: true },
                        },
                    },
                },
            },
        });
        const displayNames = await Promise.all(allFriendships.map(async (friendship) => {
            const isCurrentUser = friendship.user1_id === currentUserId;
            const friendData = isCurrentUser
                ? friendship.user_receiver
                : friendship.user_sender;
            const confidentiality_level = isCurrentUser
                ? friendship.confidentiality_level_1
                : friendship.confidentiality_level_2;
            const userId = friendData.id;
            const userTag = friendData.tag;
            if (friendData.user_data.length < 2) {
                return { userId, userTag, confidentiality_level };
            }
            const friendDataIds = friendData.user_data.map((d) => d.id);
            const perms = await this.prisma.permission.findMany({
                where: {
                    receiver_id: currentUserId,
                    user_data_id: { in: friendDataIds },
                },
                select: { user_data_id: true },
            });
            if (perms.length === 2) {
                const lastName = friendData.user_data.find((d) => d.label_id === 1).content;
                const firstName = friendData.user_data.find((d) => d.label_id === 2).content;
                return {
                    userId,
                    userTag,
                    confidentiality_level,
                    firstName,
                    lastName,
                };
            }
            return { userId, userTag, confidentiality_level };
        }));
        return displayNames;
    }
    async findOne(currentUserId, friendId) {
        const findFriendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1_id: currentUserId, user2_id: friendId },
                    { user2_id: currentUserId, user1_id: friendId },
                ],
            },
        });
        if (!findFriendship) {
            throw new common_1.BadRequestException('amitié non trouvé');
        }
        let findData;
        if (currentUserId === findFriendship?.user1_id) {
            let allowed = (0, confidentiality_array_1.getLevel)(findFriendship.confidentiality_level_2);
            findData = await this.prisma.user_data.findMany({
                where: {
                    user_id: findFriendship.user2_id,
                    confidentiality: { in: allowed },
                },
                select: {
                    id: true,
                    content: true,
                    data_label: {
                        select: { label: true },
                    },
                },
            });
        }
        else {
            let allowed = (0, confidentiality_array_1.getLevel)(findFriendship.confidentiality_level_1);
            findData = await this.prisma.user_data.findMany({
                where: {
                    user_id: findFriendship.user1_id,
                    confidentiality: { in: allowed },
                },
                select: {
                    id: true,
                    content: true,
                    data_label: {
                        select: { label: true },
                    },
                },
            });
        }
        const findPermission = await this.prisma.permission.findMany({
            where: {
                sender_id: currentUserId,
                receiver_id: friendId,
            },
            select: { user_data_id: true },
        });
        const permittedDataIds = findPermission
            .map((p) => p.user_data_id)
            .filter((id) => id !== null);
        let permissionData = [];
        if (permissionData.length > 0) {
            permissionData = await this.prisma.user_data.findMany({
                where: { id: { in: permittedDataIds } },
                include: {
                    data_label: {
                        select: { label: true },
                    },
                },
            });
        }
        const permission = permissionData.filter((p) => !findData.some((fd) => fd.id === p.id));
        const friendData = [...findData, ...permission];
        return friendData;
    }
    async patchFriendConfidentiality(currentUserId, dto) {
        const findFriendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1_id: currentUserId, user2_id: dto.friendId },
                    { user2_id: currentUserId, user1_id: dto.friendId },
                ],
            },
        });
        if (!findFriendship) {
            throw new common_1.BadRequestException('Amitié non trouvée');
        }
        const result = await this.prisma.friendship?.update({
            where: { id: findFriendship?.id },
            data: {
                confidentiality_level_1: currentUserId === findFriendship?.user1_id
                    ? dto.confidentiality
                    : findFriendship?.confidentiality_level_1,
                confidentiality_level_2: currentUserId === findFriendship?.user2_id
                    ? dto.confidentiality
                    : findFriendship?.confidentiality_level_2,
            },
        });
        const confidentialityUpdated = currentUserId === findFriendship?.user1_id
            ? result.confidentiality_level_1
            : result.confidentiality_level_2;
        const friendId = currentUserId === findFriendship.user1_id
            ? findFriendship.user2_id
            : findFriendship.user1_id;
        return { friendId, confidentiality: confidentialityUpdated };
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        friend_request_service_1.FriendRequestService,
        notification_service_1.NotificationService])
], FriendshipService);
//# sourceMappingURL=friendship.service.js.map