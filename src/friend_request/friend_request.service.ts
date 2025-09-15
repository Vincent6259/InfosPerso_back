import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend_request.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class FriendRequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationService,
  ) {}

  async create(
    createFriendRequestDto: CreateFriendRequestDto,
    user1Id: number,
  ) {
    const { tag, confidentiality } = createFriendRequestDto;

    const user2 = await this.prisma.user.findUnique({
      where: {
        tag,
      },
    });
    if (!user2) {
      throw new BadRequestException();
    }

    const user2Id = user2.id;

    const findFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1_id: user1Id, user2_id: user2Id },
          { user2_id: user1Id, user1_id: user2Id },
        ],
      },
    });

    if (findFriendship) {
      throw new BadRequestException('Friendship already exist');
    }

    const findFriendRequest = await this.prisma.friend_request.findFirst({
      where: { sender_id: user1Id, receiver_id: user2Id },
    });

    if (findFriendRequest) {
      throw new BadRequestException('Demande déjà envoyée.');
    }

    const newFriendRequest = await this.prisma.friend_request.create({
      data: {
        sender_id: user1Id,
        receiver_id: user2Id,
        confidentiality: confidentiality,
      },
    });

    return newFriendRequest;
  }

  // findAll() {
  //   return `This action returns all firendRequest`;
  // }

  async remove(requestId: number) {
    const removeFriendshipRequest = await this.prisma.friend_request.delete({
      where: { id: requestId },
    });
    return removeFriendshipRequest;
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
      content: "Votre demande d'amitie a ete refusee",
    };

    await this.notification.create(newNotification);
    return removeFriendshipRequest;
  }
}
