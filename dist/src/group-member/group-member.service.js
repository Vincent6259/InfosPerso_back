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
exports.GroupMemberService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let GroupMemberService = class GroupMemberService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOne(createGroupMemberDto) {
        const groupMember = await this.prisma.group_member.create({
            data: {
                group_id: createGroupMemberDto.group_id,
                user_id: createGroupMemberDto.user_id,
            },
        });
        if (!groupMember) {
            throw new common_1.HttpException('This member is already in this group', common_1.HttpStatus.CONFLICT);
        }
        return groupMember;
    }
    async findAllByGroup(group_id) {
        const groupMembers = await this.prisma.group_member.findMany({
            where: { group_id },
            select: {
                user_id: true,
                user: {
                    select: {
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
        });
        return groupMembers;
    }
    async remove(deleteGroupMemberDto) {
        const groupMember = await this.prisma.group_member.delete({
            where: {
                group_id_user_id: {
                    group_id: deleteGroupMemberDto.group_id,
                    user_id: deleteGroupMemberDto.user_id,
                },
            },
        });
        return groupMember;
    }
};
exports.GroupMemberService = GroupMemberService;
exports.GroupMemberService = GroupMemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupMemberService);
//# sourceMappingURL=group-member.service.js.map