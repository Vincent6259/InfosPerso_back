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
exports.UserDataService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserDataService = class UserDataService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createUserDataDto) {
        const userDatas = [];
        for (const dto of createUserDataDto) {
            const foundLabel = await this.prisma.data_label.findFirst({
                where: { label: dto.label },
            });
            if (!foundLabel) {
                throw new common_1.HttpException('Label not found', common_1.HttpStatus.NOT_FOUND);
            }
            const existing = await this.prisma.user_data.findFirst({
                where: {
                    label_id: foundLabel.id,
                    user_id: userId,
                },
            });
            if (existing) {
                throw new common_1.HttpException('Label already exists for this user', common_1.HttpStatus.BAD_REQUEST);
            }
            const userData = await this.prisma.user_data.create({
                data: {
                    user_id: userId,
                    content: dto.content,
                    confidentiality: dto.confidentiality,
                    label_id: foundLabel.id,
                },
            });
            userDatas.push(userData);
        }
        return userDatas;
    }
    async findAll(userId) {
        return this.prisma.user_data.findMany({
            where: { user_id: userId },
            select: {
                id: true,
                content: true,
                confidentiality: true,
                data_label: {
                    select: { label: true },
                },
            },
        });
    }
    async update(id, updateUserDataDto) {
        return this.prisma.user_data.update({
            where: { id },
            data: updateUserDataDto,
        });
    }
    async remove(id) {
        return this.prisma.user_data.delete({
            where: { id },
        });
    }
};
exports.UserDataService = UserDataService;
exports.UserDataService = UserDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserDataService);
//# sourceMappingURL=user_data.service.js.map