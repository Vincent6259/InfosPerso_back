import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  MessageEvent,
  NotFoundException,
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
    const notificationCreated: notification =
      await this.prisma.notification.create({
        data: {
          user_id: createNotificationDto.user_id,
          content: createNotificationDto.content,
        },
      });

    this.streams.get(createNotificationDto.user_id)?.next({
      id: `${notificationCreated.id}-${Date.now()}`,
      type: 'created',
      data: { notification: notificationCreated },
    });
    return notificationCreated;
  }

  async findAllForUserLogin(currentUserId: number): Promise<notification[]> {
    try {
      const notifications: notification[] =
        await this.prisma.notification.findMany({
          where: { user_id: currentUserId },
        });
      return notifications;
    } catch {
      throw new InternalServerErrorException('erreur serveur');
    }
  }

  async toggleIsRead(
    currentUserId: number,
    notificationId: number,
  ): Promise<notification | undefined> {
    const notifData = await this.checkNotificationOwner(
      notificationId,
      currentUserId,
    );

    try {
      if (notifData) {
        const updated = await this.prisma.notification.update({
          where: { id: notifData.id },
          data: { is_read: !notifData.is_read },
        });
        this.streams.get(currentUserId)?.next({
          id: `${updated.id}-${Date.now()}`,
          type: 'updated',
          data: { notification: updated },
        });
        return updated;
      }
    } catch {
      throw new InternalServerErrorException('erreur serveur');
    }
  }

  async remove(
    currentUserId: number,
    notificationId: number,
  ): Promise<notification | undefined> {
    const notifData = await this.checkNotificationOwner(
      notificationId,
      currentUserId,
    );

    try {
      if (notifData) {
        const deleted = await this.prisma.notification.delete({
          where: { id: notificationId },
        });
        this.streams.get(currentUserId)?.next({
          id: `${deleted.id}-${Date.now()}`,
          type: 'deleted',
          data: { id: deleted.id },
        });
        return deleted;
      }
    } catch {
      throw new InternalServerErrorException('erreur serveur');
    }
  }

  private async checkNotificationOwner(
    id: number,
    currentUserId: number,
  ): Promise<notification> {
    const notification: notification | null =
      await this.prisma.notification.findUnique({
        where: { id },
      });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    } else {
      if (notification.user_id !== currentUserId) {
        throw new ForbiddenException(
          'You are not the owner of this notification',
        );
      } else {
        return notification;
      }
    }
  }

  getNotificationStream(currentUserId: number): Observable<MessageEvent> {
    if (!this.streams.has(currentUserId)) {
      this.streams.set(currentUserId, new Subject<MessageEvent>());
    }

    const initial$ = from(this.findAllForUserLogin(currentUserId)).pipe(
      map((notifs) => ({
        id: `initial-${Date.now()}`,
        type: 'initial',
        data: { notifications: notifs },
      })),
    );

    const updates$ = this.streams.get(currentUserId)!.asObservable();

    return concat(initial$, updates$);
  }
}
