import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService], // la factory (la fonction définie dans useFactory) recevra une instance de ConfigService comme argument.
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        // C'est une fonction de fabrique asynchrone qui, une fois appelée avec le ConfigService, retourne un objet de configuration pour le JwtModule.
        global: true,
        secret: configService.get<string>('SECRET_ACCESSTOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESSTOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
