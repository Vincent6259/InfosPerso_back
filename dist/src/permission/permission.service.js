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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const info_request_service_1 = require("../info_request/info_request.service");
const notification_service_1 = require("../notification/notification.service");
let PermissionService = class PermissionService {
    prisma;
    infoRequestService;
    notification;
    constructor(prisma, infoRequestService, notification) {
        this.prisma = prisma;
        this.infoRequestService = infoRequestService;
        this.notification = notification;
    }
    async create(requestId, user2Id) {
        const request = await this.prisma.information_request.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.BadRequestException(`Request not found`);
        }
        if (request.receiver_id !== user2Id) {
            throw new common_1.ForbiddenException(`Not allowed to accept this request`);
        }
        const user1Id = request.sender_id;
        const user_dataId = request.user_data_id;
        const newPermission = await this.prisma.permission.create({
            data: {
                user_data_id: user_dataId,
                sender_id: user1Id,
                receiver_id: user2Id,
            },
        });
        await this.infoRequestService.remove(requestId);
        const newNotification = {
            user_id: request.sender_id,
            content: "Votre demande d'amitie a ete acceptee",
        };
        await this.notification.create(newNotification);
        return newPermission;
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        info_request_service_1.InfoRequestService,
        notification_service_1.NotificationService])
], PermissionService);
//# sourceMappingURL=permission.service.js.map