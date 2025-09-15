import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InfoRequestService } from 'src/info_request/info_request.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infoRequestService: InfoRequestService,
    private readonly notification: NotificationService,
  ) {}

  async create(requestId: number, user2Id: number) {
    const request = await this.prisma.information_request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new BadRequestException(`Request not found`);
    }

    if (request.receiver_id !== user2Id) {
      throw new ForbiddenException(`Not allowed to accept this request`);
    }

    const user1Id = request.sender_id;

    const user_dataId = request.user_data_id;

    const newPermission = await this.prisma.permission.create({
      data: {
        user_data_id: user_dataId,
        sender_id: user1Id,
        receiver_id: user2Id,
      },
    });

    await this.infoRequestService.remove(requestId);

    const newNotification = {
      user_id: request.sender_id,
      content: "Votre demande d'information a ete acceptée",
    };

    await this.notification.create(newNotification);

    return newPermission;
  }

  // findAll() {
  //   return `This action returns all permission`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} permission`;
  // }

  // update(id: number, updatePermissionDto: UpdatePermissionDto) {
  //   return `This action updates a #${id} permission`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} permission`;
  // }
}
