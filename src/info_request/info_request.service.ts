import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { user } from '@prisma/client';
import { CreateInfoRequestDto } from './dto/create-info_request.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class InfoRequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationService,
  ) {}

  async create(user1Id: number, dto: CreateInfoRequestDto) {
    const { label, tag, Prénom, Nom } = dto;

    let findUser: user | null;

    if (tag) {
      findUser = await this.prisma.user.findFirst({
        where: {
          tag,
        },
      });
    } else {
      findUser = await this.prisma.user.findFirst({
        where: {
          AND: [
            {
              user_data: {
                some: {
                  label_id: 2,
                  content: Prénom,
                },
              },
            },
            {
              user_data: {
                some: {
                  label_id: 1,
                  content: Nom,
                },
              },
            },
          ],
        },
      });
    }

    if (!findUser) {
      throw new BadRequestException('utilisateur non trouvé');
    }

    const user2Id = findUser.id;

    const findDataLabel = await this.prisma.data_label.findFirst({
      where: {
        label: label,
      },
    });

    const findUserData = await this.prisma.user_data.findFirst({
      where: { label_id: findDataLabel?.id },
    });

    if (!findUserData) {
      throw new BadRequestException('donné non disponible');
    }

    const userDataId = findUserData.id;

    const findPermission = await this.prisma.permission.findFirst({
      where: {
        sender_id: user1Id,
        receiver_id: user2Id,
        user_data_id: userDataId,
      },
    });

    if (findPermission) {
      throw new BadRequestException('la permission existe déjà');
    }

    const findInfoRequest = await this.prisma.information_request.findFirst({
      where: {
        sender_id: user1Id,
        receiver_id: user2Id,
        user_data_id: userDataId,
      },
    });

    if (findInfoRequest) {
      throw new BadRequestException('Infosrequest existe déjà');
    }

    const newInfoRequest = await this.prisma.information_request.create({
      data: {
        sender_id: user1Id,
        receiver_id: user2Id,
        user_data_id: userDataId,
      },
    });

    return newInfoRequest;
  }

  // findAll() {
  //   return `This action returns all infoRequest`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} infoRequest`;
  // }

  // update(id: number, updateInfoRequestDto: UpdateInfoRequestDto) {
  //   return `This action updates a #${id} infoRequest`;
  // }

  async remove(requestId: number) {
    const removeInfoRequest = await this.prisma.information_request.delete({
      where: { id: requestId },
    });
    return removeInfoRequest;
  }

  async requestRefused(requestId: number) {
    const removeFriendshipRequest = await this.prisma.friend_request.delete({
      where: { id: requestId },
    });

    const request = await this.prisma.friend_request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new BadRequestException('Requete non trouvee');
    }

    const newNotification = {
      user_id: request.sender_id,
      content: "Votre demande d'info a ete refusee",
    };

    await this.notification.create(newNotification);
    return removeFriendshipRequest;
  }
}
