import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from './publicKey';
import { Reflector } from '@nestjs/core';

export interface JwtPayload {
  sub: number;
  email: string;
}

type TypedCookies = Record<string, string>;

export type AuthRequest = Omit<Request, 'cookies'> & {
  cookies: TypedCookies;
  user: JwtPayload;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const isRefresh = request.path === '/auth/refresh';
    const token = this.extractToken(request, isRefresh);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>(
          isRefresh ? 'SECRET_REFRESHTOKEN' : 'SECRET_ACCESSTOKEN',
        ),
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(
    request: AuthRequest,
    isRefresh: boolean,
  ): string | undefined {
    if (isRefresh) return request.cookies.refresh_token;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') return token;
    return request.cookies.access_token;
  }
}
