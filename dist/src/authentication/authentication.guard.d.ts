import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
export interface JwtPayload {
    sub: number;
    email: string;
}
export type AuthRequest = Request & {
    user: JwtPayload;
};
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private configService;
    private reflector;
    constructor(jwtService: JwtService, configService: ConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
