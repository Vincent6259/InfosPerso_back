import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { authenticationWithUserResponse, Tokens } from './types';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthenticationService {
    private readonly prisma;
    private readonly userService;
    private jwtService;
    constructor(prisma: PrismaService, userService: UserService, jwtService: JwtService);
    private hashData;
    private getTokens;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    signUp(createUserDto: CreateUserDto): Promise<authenticationWithUserResponse>;
    signIn(signInDto: SignInDto): Promise<authenticationWithUserResponse>;
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
    logout(userId: number): Promise<void>;
}
