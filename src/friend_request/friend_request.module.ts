import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend_request.service';
import { FriendRequestController } from './friend_request.controller';
import { FriendshipService } from 'src/friendship/friendship.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [FriendRequestController],
  providers: [FriendRequestService, NotificationService],
})
export class FriendRequestModule {}
