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
exports.FriendRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let FriendRequestService = class FriendRequestService {
    prisma;
    notification;
    constructor(prisma, notification) {
        this.prisma = prisma;
        this.notification = notification;
    }
    async create(createFriendRequestDto, user1Id) {
        const { tag, confidentiality } = createFriendRequestDto;
        const user2 = await this.prisma.user.findUnique({
            where: {
                tag,
            },
        });
        if (!user2) {
            throw new common_1.BadRequestException();
        }
        const user2Id = user2.id;
        const findFriendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1_id: user1Id, user2_id: user2Id },
                    { user2_id: user1Id, user1_id: user2Id },
                ],
            },
        });
        if (findFriendship) {
            throw new common_1.BadRequestException('Friendship already exist');
        }
        const findFriendRequest = await this.prisma.friend_request.findFirst({
            where: { sender_id: user1Id, receiver_id: user2Id },
        });
        if (findFriendRequest) {
            throw new common_1.BadRequestException('Demande déjà envoyée.');
        }
        const newFriendRequest = await this.prisma.friend_request.create({
            data: {
                sender_id: user1Id,
                receiver_id: user2Id,
                confidentiality: confidentiality,
            },
        });
        return newFriendRequest;
    }
    async remove(requestId) {
        const removeFriendshipRequest = await this.prisma.friend_request.delete({
            where: { id: requestId },
        });
        return removeFriendshipRequest;
    }
    async requestRefused(requestId) {
        const removeFriendshipRequest = await this.prisma.friend_request.delete({
            where: { id: requestId },
        });
        const request = await this.prisma.friend_request.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.BadRequestException('Requete non trouvee');
        }
        const newNotification = {
            user_id: request.sender_id,
            content: "Votre demande d'amitie a ete refusee",
        };
        await this.notification.create(newNotification);
        return removeFriendshipRequest;
    }
};
exports.FriendRequestService = FriendRequestService;
exports.FriendRequestService = FriendRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], FriendRequestService);
//# sourceMappingURL=friend_request.service.js.map