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
exports.GroupPermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let GroupPermissionService = class GroupPermissionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createManyByGroup(currentUserId, dto) {
        await this.checkGroupOwner(dto.group_id, currentUserId);
        return await this.prisma.group_permission.createMany({
            data: dto.data_label_ids.map((dataLabelId) => ({
                group_id: dto.group_id,
                data_label_id: dataLabelId,
            })),
        });
    }
    async findAllByGroup(currentUserId, groupId) {
        await this.checkGroupOwner(groupId, currentUserId);
        return await this.prisma.group_permission.findMany({
            where: { group_id: groupId },
            select: {
                data_label: {
                    select: {
                        id: true,
                        label: true,
                    },
                }
            }
        });
    }
    async updateManyByGroup(currentUserId, dto) {
        await this.checkGroupOwner(dto.group_id, currentUserId);
        await this.reverseRemoveManyByGroup(dto);
        return await this.createManyByGroup(currentUserId, dto);
    }
    async removeManyByGroup(currentUserId, dto) {
        await this.checkGroupOwner(dto.group_id, currentUserId);
        return await this.prisma.group_permission.deleteMany({
            where: {
                group_id: dto.group_id,
                data_label_id: { in: dto.data_label_ids },
            },
        });
    }
    async removeAllByGroup(currentUserId, groupId) {
        await this.checkGroupOwner(groupId, currentUserId);
        return await this.prisma.group_permission.deleteMany({
            where: {
                group_id: groupId,
            },
        });
    }
    async checkGroupOwner(groupId, userId) {
        const group = await this.prisma.group.findUnique({
            where: { id: groupId, creator_id: userId },
        });
        if (!group) {
            throw new common_1.HttpException('You are not the owner of this group!', common_1.HttpStatus.FORBIDDEN);
        }
        return group;
    }
    async reverseRemoveManyByGroup(dto) {
        return await this.prisma.group_permission.deleteMany({
            where: {
                group_id: dto.group_id,
                data_label_id: { notIn: dto.data_label_ids },
            },
        });
    }
};
exports.GroupPermissionService = GroupPermissionService;
exports.GroupPermissionService = GroupPermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupPermissionService);
//# sourceMappingURL=group-permission.service.js.map