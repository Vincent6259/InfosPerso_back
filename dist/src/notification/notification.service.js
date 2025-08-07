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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotificationService = class NotificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        try {
            const notification = await this.prisma.notification.create({
                data: {
                    user_id: createNotificationDto.user_id,
                    content: createNotificationDto.content,
                },
            });
            return notification;
        }
        catch (error) {
            return error;
        }
    }
    async findAllForUserLogin(userId) {
        try {
            const notifications = await this.prisma.notification.findMany({
                where: { user_id: userId },
            });
            return notifications;
        }
        catch (error) {
            return error;
        }
    }
    async toggleIsRead(currentUserId, notificationId) {
        try {
            const notifData = await this.checkNotificationOwner(notificationId, currentUserId);
            if (notifData) {
                const notification = await this.prisma.notification.update({
                    where: { id: notifData.id },
                    data: { is_read: notifData.is_read ? false : true },
                });
                return notification;
            }
        }
        catch (error) {
            return error;
        }
    }
    async remove(currentUserId, notificationId) {
        try {
            const notifData = await this.checkNotificationOwner(notificationId, currentUserId);
            if (notifData) {
                const notification = await this.prisma.notification.delete({
                    where: { id: notificationId },
                });
                return notification;
            }
        }
        catch (error) {
            return error;
        }
    }
    async checkNotificationOwner(id, userId) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            throw new common_1.HttpException('Notification not found', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            if (notification.user_id !== userId) {
                throw new common_1.HttpException('You are not the owner of this notification', common_1.HttpStatus.FORBIDDEN);
            }
            else {
                return notification;
            }
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map