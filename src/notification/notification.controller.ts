import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  HttpCode,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { notification } from '@prisma/client';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { Observable } from 'rxjs';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<notification> {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAllForUserLogin(@Req() request: AuthRequest): Promise<notification[]> {
    return this.notificationService.findAllForUserLogin(request.user.sub);
  }

  @Patch(':notificationId')
  update(
    @Req() request: AuthRequest,
    @Param('notificationId', ParseIntPipe) notificationId: number,
  ): Promise<notification | undefined> {
    return this.notificationService.toggleIsRead(
      request.user.sub,
      notificationId,
    );
  }

  @Delete(':id')
  remove(
    @Req() request: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<notification | undefined> {
    return this.notificationService.remove(request.user.sub, id);
  }

  @Sse('sse')
  notificationStream(@Req() req: AuthRequest): Observable<MessageEvent> {
    return this.notificationService.getNotificationStream(req.user.sub);
  }
}
