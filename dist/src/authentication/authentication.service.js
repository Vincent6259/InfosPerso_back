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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require("argon2");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthenticationService = class AuthenticationService {
    prisma;
    userService;
    jwtService;
    constructor(prisma, userService, jwtService) {
        this.prisma = prisma;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async hashData(data) {
        return argon2.hash(data);
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: process.env.SECRET_ACCESSTOKEN,
                expiresIn: process.env.ACCESSTOKEN_EXPIRATION_TIME,
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: process.env.SECRET_REFRESHTOKEN,
                expiresIn: process.env.REFRESHTOKEN_EXPIRATION_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashRefreshToken = await this.hashData(refreshToken);
        await this.prisma.user.update({
            where: { id: userId },
            data: { hashRefreshToken },
        });
    }
    async signUp(createUserDto) {
        const user = await this.userService.create(createUserDto);
        const tokens = await this.getTokens(user.id, createUserDto.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return {
            user,
            tokens: tokens
        };
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new common_1.ForbiddenException('Erreur de connexion');
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword)
            throw new common_1.ForbiddenException('Erreur de connexion');
        const tokens = await this.getTokens(user.id, email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return {
            user,
            tokens: tokens
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new common_1.BadRequestException('User id in Jwt is not valid');
        const refreshTokenMatchs = await argon2.verify(user.hashRefreshToken, refreshToken);
        if (!refreshTokenMatchs)
            throw new common_1.ForbiddenException('Refresh token does not match');
        const email = await this.prisma.user_data.findFirst({
            where: {
                user_id: userId,
                label_id: 3,
            },
        });
        if (!email)
            throw new common_1.BadRequestException('User in the JWT don t have email');
        const tokens = await this.getTokens(user.id, email.content);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        };
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { hashRefreshToken: '' },
        });
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map