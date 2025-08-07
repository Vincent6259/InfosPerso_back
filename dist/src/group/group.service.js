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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let GroupService = class GroupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createGroupDto) {
        const createdGroup = await this.prisma.group.create({
            data: {
                name: createGroupDto.name,
                description: createGroupDto.description,
                creator_id: userId,
            },
        });
        await this.prisma.group_member.create({
            data: {
                group_id: createdGroup.id,
                user_id: userId,
            },
        });
        if (createGroupDto.sharedData?.length) {
            const sharedData = createGroupDto.sharedData.map((labelId) => ({
                group_id: createdGroup.id,
                data_label_id: labelId,
            }));
            await this.prisma.group_permission.createMany({
                data: sharedData,
            });
        }
        if (createGroupDto.invitedMembers?.length) {
            const groupRequests = createGroupDto.invitedMembers.map((memberId) => ({
                sender_id: userId,
                receiver_id: memberId,
                group_id: createdGroup.id,
            }));
            await this.prisma.group_request.createMany({
                data: groupRequests,
            });
        }
        return createdGroup;
    }
    async findAll(userId) {
        const groups = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                group_members: {
                    select: {
                        group: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                creator_id: true
                            },
                        },
                    },
                },
            },
        });
        return groups;
    }
    async findOne(id, group_id) {
        const isMember = await this.prisma.group_member.findFirst({
            where: {
                AND: {
                    user_id: {
                        equals: id
                    },
                    group_id: {
                        equals: group_id
                    }
                }
            }
        });
        if (!isMember) {
            throw new common_1.HttpException('Not a member', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.group.findFirst({
            where: {
                id: group_id
            }, select: {
                id: true,
                name: true,
                description: true,
                creator_id: true,
                group_permission: {
                    select: {
                        data_label_id: true,
                        data_label: {
                            select: {
                                label: true
                            }
                        }
                    }
                }
            }
        });
    }
    async update(user_id, group_id, updateGroupDto) {
        const pickedGroup = await this.prisma.group.findUnique({
            where: {
                id: group_id
            }
        });
        if (pickedGroup?.creator_id !== user_id) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return await this.prisma.group.update({
            where: { id: group_id },
            data: updateGroupDto,
        });
    }
    async remove(user_id, group_id) {
        const pickedGroup = await this.prisma.group.findUnique({
            where: {
                id: group_id
            }
        });
        if (pickedGroup?.creator_id !== user_id) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.prisma.group_request.deleteMany({
            where: {
                group_id
            }
        });
        await this.prisma.group_permission.deleteMany({
            where: {
                group_id
            }
        });
        await this.prisma.group_member.deleteMany({
            where: {
                group_id
            }
        });
        await this.prisma.group.delete({
            where: {
                id: group_id
            }
        });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map