import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { authenticationWithUserResponse, Tokens } from './types';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.SECRET_ACCESSTOKEN,
          expiresIn: process.env.ACCESSTOKEN_EXPIRATION_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.SECRET_REFRESHTOKEN,
          expiresIn: process.env.REFRESHTOKEN_EXPIRATION_TIME,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashRefreshToken },
    });
  }

  //-----------------------------------------------------------------------------------------------------------------------------------

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<authenticationWithUserResponse> {
    const user = await this.userService.create(createUserDto);

    const tokens = await this.getTokens(user.id, createUserDto.email);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      user,
      tokens: tokens,
    };
  }

  async signIn(signInDto: SignInDto): Promise<authenticationWithUserResponse> {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new ForbiddenException('Erreur de connexion');

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) throw new ForbiddenException('Erreur de connexion');

    const tokens = await this.getTokens(user.id, email);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      user,
      tokens: tokens,
    };
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException('User id in Jwt is not valid');

    const refreshTokenMatchs = await argon2.verify(
      user.hashRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatchs)
      throw new ForbiddenException('Refresh token does not match');

    const email = await this.prisma.user_data.findFirst({
      where: {
        user_id: userId,
        label_id: 3,
      },
    });
    if (!email)
      throw new BadRequestException('User in the JWT don t have email');

    const tokens = await this.getTokens(user.id, email.content);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashRefreshToken: '' },
    });
  }
}
