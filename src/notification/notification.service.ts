import {
  HttpException,
  HttpStatus,
  Injectable,
  MessageEvent,
} from '@nestjs/common';
import { notification } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { concat, from, map, Observable, Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private streams = new Map<number, Subject<MessageEvent>>();

  constructor(private readonly prisma: PrismaService) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<notification> {
    try {
      const notification: notification = await this.prisma.notification.create({
        data: {
          user_id: createNotificationDto.user_id,
          content: createNotificationDto.content,
        },
      });

      const subject = this.streams.get(createNotificationDto.user_id);
      if (subject) {
        subject.next({
          data: JSON.stringify({ initial: true, notifications: notification }),
        });
      }
      return notification;
    } catch (error) {
      return error;
    }
  }

  async findAllForUserLogin(userId: number): Promise<notification[]> {
    try {
      const notifications: notification[] =
        await this.prisma.notification.findMany({
          where: { user_id: userId },
        });
      return notifications;
    } catch (error) {
      return error;
    }
  }

  async toggleIsRead(
    currentUserId: number,
    notificationId: number,
  ): Promise<notification | undefined> {
    try {
      const notifData = await this.checkNotificationOwner(
        notificationId,
        currentUserId,
      );

      if (notifData) {
        const notification: notification =
          await this.prisma.notification.update({
            where: { id: notifData.id },
            data: { is_read: notifData.is_read ? false : true },
          });
        return notification;
      }
    } catch (error) {
      return error;
    }
  }

  async remove(
    currentUserId: number,
    notificationId: number,
  ): Promise<notification | undefined> {
    try {
      const notifData = await this.checkNotificationOwner(
        notificationId,
        currentUserId,
      );

      if (notifData) {
        const notification: any = await this.prisma.notification.delete({
          where: { id: notificationId },
        });
        return notification;
      }
    } catch (error) {
      return error;
    }
  }

  private async checkNotificationOwner(
    id: number,
    userId: number,
  ): Promise<notification> {
    const notification: notification | null =
      await this.prisma.notification.findUnique({
        where: { id },
      });
    if (!notification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    } else {
      if (notification.user_id !== userId) {
        throw new HttpException(
          'You are not the owner of this notification',
          HttpStatus.FORBIDDEN,
        );
      } else {
        return notification;
      }
    }
  }

  getNotificationStream(userId: number): Observable<MessageEvent> {
    if (!this.streams.has(userId)) {
      this.streams.set(userId, new Subject<MessageEvent>());
    }
    const updates$ = this.streams.get(userId)!.asObservable();

    const initial$ = from(this.findAllForUserLogin(userId)).pipe(
      map((notifs) => ({
        data: JSON.stringify({ initial: true, notifications: notifs }),
      })),
    );

    return concat(initial$, updates$);
  }
}
