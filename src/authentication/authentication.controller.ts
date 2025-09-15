import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, AuthRequest, JwtPayload } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { Public } from './publicKey';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { authenticationWithUserResponse, Tokens } from './types';
import type {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signUp')
  async signUp(
    @Body() createUserDtot: CreateUserDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<authenticationWithUserResponse> {
    const { user, tokens } =
      await this.authenticationService.signUp(createUserDtot);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { user, tokens };
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signIn')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<authenticationWithUserResponse> {
    const authResponse = await this.authenticationService.signIn(signInDto);
    const { user, tokens } = authResponse;

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { user, tokens };
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refresh(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<Tokens> {
    const refreshToken =
      (req.cookies as Record<string, string>)['refresh_token'] ?? '';
    const tokens = await this.authenticationService.refreshTokens(
      req.user.sub,
      refreshToken,
    );

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return tokens;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<void> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    await this.authenticationService.logout(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthRequest): JwtPayload | undefined {
    return req.user;
  }
}
