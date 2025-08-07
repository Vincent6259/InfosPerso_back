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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const prisma_service_1 = require("../../prisma/prisma.service");
const generateTag_1 = require("./tag/generateTag");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { email, password, confirmPassword } = createUserDto;
        const existingMail = await this.prisma.user_data.findFirst({
            where: {
                label_id: 3,
                content: email,
            },
        });
        if (existingMail) {
            throw new common_1.BadRequestException('Ce mail est déjà utilisé');
        }
        const tag = await (0, generateTag_1.default)(this.prisma);
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('pas le même mot de passe');
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = await this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: { hashRefreshToken: '', password: hashedPassword, tag: tag },
            });
            await prisma.user_data.create({
                data: {
                    content: email,
                    user_id: user.id,
                    label_id: 3,
                    confidentiality: 'MAXIMUM',
                },
            });
            return user;
        });
        const { ...result } = newUser;
        return result;
    }
    async findByEmail(email) {
        const userData = await this.prisma.user_data.findFirst({
            where: {
                label_id: 3,
                content: email,
            },
            include: {
                user: true,
            },
        });
        if (!userData || !userData.user) {
            throw new common_1.BadRequestException('Utilisateur non trouvé');
        }
        return userData.user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map