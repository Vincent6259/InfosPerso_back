import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { ConversationModule } from './conversation/conversation.module';
import { PrismaModule } from 'prisma/prisma.module';
import { GroupMemberModule } from './group-member/group-member.module';
import { UserDataModule } from './user_data/user_data.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { GroupModule } from './group/group.module';
import { FriendshipModule } from './friendship/friendship.module';
import { FriendRequestModule } from './friend_request/friend_request.module';
import { GroupPermissionModule } from './group-permission/group-permission.module';
import { PermissionModule } from './permission/permission.module';
import { InfoRequestModule } from './info_request/info_request.module';
import { DataLabelModule } from './data_label/data_label.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    NotificationModule,
    ConversationModule,
    PrismaModule,
    UserDataModule,
    GroupMemberModule,
    AuthenticationModule,
    GroupModule,
    FriendshipModule,
    FriendRequestModule,
    GroupPermissionModule,
    PermissionModule,
    InfoRequestModule,
    DataLabelModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
