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
exports.InfoRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let InfoRequestService = class InfoRequestService {
    prisma;
    notification;
    constructor(prisma, notification) {
        this.prisma = prisma;
        this.notification = notification;
    }
    async create(user1Id, dto) {
        const { label, tag, Prénom, Nom } = dto;
        let findUser;
        if (tag) {
            findUser = await this.prisma.user.findFirst({
                where: {
                    tag,
                },
            });
        }
        else {
            findUser = await this.prisma.user.findFirst({
                where: {
                    AND: [
                        {
                            user_data: {
                                some: {
                                    label_id: 2,
                                    content: Prénom,
                                },
                            },
                        },
                        {
                            user_data: {
                                some: {
                                    label_id: 1,
                                    content: Nom,
                                },
                            },
                        },
                    ],
                },
            });
        }
        if (!findUser) {
            throw new common_1.BadRequestException('utilisateur non trouvé');
        }
        const user2Id = findUser.id;
        const findDataLabel = await this.prisma.data_label.findFirst({
            where: {
                label: label,
            },
        });
        const findUserData = await this.prisma.user_data.findFirst({
            where: { label_id: findDataLabel?.id },
        });
        if (!findUserData) {
            throw new common_1.BadRequestException('donné non disponible');
        }
        const userDataId = findUserData.id;
        const findPermission = await this.prisma.permission.findFirst({
            where: {
                sender_id: user1Id,
                receiver_id: user2Id,
                user_data_id: userDataId,
            },
        });
        if (findPermission) {
            throw new common_1.BadRequestException('la permission existe déjà');
        }
        const findInfoRequest = await this.prisma.information_request.findFirst({
            where: {
                sender_id: user1Id,
                receiver_id: user2Id,
                user_data_id: userDataId,
            },
        });
        if (findInfoRequest) {
            throw new common_1.BadRequestException('Infosrequest existe déjà');
        }
        const newInfoRequest = await this.prisma.information_request.create({
            data: {
                sender_id: user1Id,
                receiver_id: user2Id,
                user_data_id: userDataId,
            },
        });
        return newInfoRequest;
    }
    async remove(requestId) {
        const removeInfoRequest = await this.prisma.information_request.delete({
            where: { id: requestId },
        });
        return removeInfoRequest;
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
            content: "Votre demande d'info a ete refusee",
        };
        await this.notification.create(newNotification);
        return removeFriendshipRequest;
    }
};
exports.InfoRequestService = InfoRequestService;
exports.InfoRequestService = InfoRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], InfoRequestService);
//# sourceMappingURL=info_request.service.js.map