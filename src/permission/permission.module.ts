import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { InfoRequestService } from 'src/info_request/info_request.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, InfoRequestService, NotificationService],
})
export class PermissionModule {}
