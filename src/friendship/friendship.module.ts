import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { FriendRequestService } from 'src/friend_request/friend_request.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendRequestService, NotificationService],
})
export class FriendshipModule {}
