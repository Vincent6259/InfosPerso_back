import { Module } from '@nestjs/common';
import { InfoRequestService } from './info_request.service';
import { InfoRequestController } from './info_request.controller';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [InfoRequestController],
  providers: [InfoRequestService, NotificationService],
})
export class InfoRequestModule {}
