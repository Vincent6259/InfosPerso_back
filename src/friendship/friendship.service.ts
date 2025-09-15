/* eslint-disable prefer-const */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FriendRequestService } from 'src/friend_request/friend_request.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendDto } from './dto/friendInterface';
import { confidentiality, friendship, Prisma, user_data } from '@prisma/client';
import { getLevel } from './confidentiality_array';
import { PatchConfidentialityDto } from './dto/patch-confidentiality.dto';
import { PatchFriendConfidentialityResult } from './dto/updateFriendInterface';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class FriendshipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly friendshiprequest: FriendRequestService,
    private readonly notification: NotificationService,
  ) {}

  async create(
    requestId: number,
    user2Id: number,
    createFriendshipDto: CreateFriendshipDto,
  ) {
    const { confidentiality } = createFriendshipDto;

    const request = await this.prisma.friend_request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new BadRequestException(`Request not found`);
    }

    if (request.receiver_id !== user2Id) {
      throw new ForbiddenException(`Not allowed to accept this request`);
    }

    const user1Id = request.sender_id;

    let user1_id: number;
    let user2_id: number;
    let confidentiality_level_1: confidentiality;
    let confidentiality_level_2: confidentiality;

    if (user1Id < user2Id) {
      user1_id = user1Id;
      user2_id = user2Id;
      confidentiality_level_1 = confidentiality;
      confidentiality_level_2 = request.confidentiality;
    } else {
      user1_id = user2Id;
      user2_id = user1Id;
      confidentiality_level_1 = request.confidentiality;
      confidentiality_level_2 = confidentiality;
    }

    const newFriendship = await this.prisma.friendship.create({
      data: {
        user1_id,
        user2_id,
        confidentiality_level_1,
        confidentiality_level_2,
      },
    });

    const allowed1 = getLevel(confidentiality);
    const allowed2 = getLevel(request.confidentiality);

    let findData1: user_data[] | null;

    findData1 = await this.prisma.user_data.findMany({
      where: { user_id: user1Id, confidentiality: { in: allowed1 } },
    });

    if (findData1.length === 0) {
      throw new BadRequestException('data not find');
    }

    let findData2: user_data[] | null;

    findData2 = await this.prisma.user_data.findMany({
      where: { user_id: user2Id, confidentiality: { in: allowed2 } },
    });

    if (findData2.length === 0) {
      throw new BadRequestException('data not find');
    }

    const createPermissions: Prisma.permissionCreateManyInput[] = [
      ...findData1.map((f) => ({
        user_data_id: f.id,
        sender_id: user2Id,
        receiver_id: user1Id,
      })),
      ...findData2.map((f) => ({
        user_data_id: f.id,
        sender_id: user1Id,
        receiver_id: user2Id,
      })),
    ];

    await this.prisma.permission.createMany({
      data: createPermissions,
      skipDuplicates: true,
    });
    await this.friendshiprequest.remove(requestId);

    const newNotification = {
      user_id: request.sender_id,
      content: "Votre demande d'amitie a ete acceptee",
    };

    await this.notification.create(newNotification);

    return newFriendship;
  }

  // --------------------------------------------------------------------------------------------

  async findAll(currentUserId: number): Promise<FriendDto[]> {
    const allFriendships = await this.prisma.friendship.findMany({
      where: {
        OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
      },
      select: {
        user1_id: true,
        user2_id: true,
        confidentiality_level_1: true,
        confidentiality_level_2: true,
        user_sender: {
          select: {
            tag: true,
            id: true,
            user_data: {
              where: { label_id: { in: [1, 2] } },
              select: { id: true, label_id: true, content: true },
            },
          },
        },
        user_receiver: {
          select: {
            id: true,
            tag: true,
            user_data: {
              where: { label_id: { in: [1, 2] } },
              select: { id: true, label_id: true, content: true },
            },
          },
        },
      },
    });

    const displayNames = await Promise.all(
      allFriendships.map(async (friendship) => {
        const isCurrentUser = friendship.user1_id === currentUserId;
        const friendData = isCurrentUser
          ? friendship.user_receiver
          : friendship.user_sender;

        const confidentiality_level = isCurrentUser
          ? friendship.confidentiality_level_1
          : friendship.confidentiality_level_2;
        const userId = friendData.id;
        const userTag = friendData.tag;

        if (friendData.user_data.length < 2) {
          return { userId, userTag, confidentiality_level };
        }
        const friendDataIds = friendData.user_data.map((d) => d.id);
        const perms = await this.prisma.permission.findMany({
          where: {
            receiver_id: currentUserId,
            user_data_id: { in: friendDataIds },
          },
          select: { user_data_id: true },
        });
        if (perms.length === 2) {
          const lastName = friendData.user_data.find(
            (d) => d.label_id === 1,
          )!.content;
          const firstName = friendData.user_data.find(
            (d) => d.label_id === 2,
          )!.content;
          return {
            userId,
            userTag,
            confidentiality_level,
            firstName,
            lastName,
          };
        }

        return { userId, userTag, confidentiality_level };
      }),
    );

    return displayNames;
  }

  // --------------------------------------------------------------------------------------------

  async findOne(currentUserId: number, friendId: number) {
    const findFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1_id: currentUserId, user2_id: friendId },
          { user2_id: currentUserId, user1_id: friendId },
        ],
      },
    });

    if (!findFriendship) {
      throw new BadRequestException('amitié non trouvé');
    }

    let findData: Partial<user_data>[] | null;

    if (currentUserId === findFriendship?.user1_id) {
      let allowed = getLevel(findFriendship.confidentiality_level_2);

      findData = await this.prisma.user_data.findMany({
        where: {
          user_id: findFriendship.user2_id,
          confidentiality: { in: allowed },
        },
        select: {
          id: true,
          content: true,
          data_label: {
            select: { label: true },
          },
        },
      });
    } else {
      let allowed = getLevel(findFriendship.confidentiality_level_1);

      findData = await this.prisma.user_data.findMany({
        where: {
          user_id: findFriendship.user1_id,
          confidentiality: { in: allowed },
        },
        select: {
          id: true,
          content: true,
          data_label: {
            select: { label: true },
          },
        },
      });
    }

    const findPermission = await this.prisma.permission.findMany({
      where: {
        sender_id: currentUserId,
        receiver_id: friendId,
      },
      select: { user_data_id: true },
    });

    const permittedDataIds: number[] = findPermission
      .map((p) => p.user_data_id)
      .filter((id): id is number => id !== null);

    let permissionData: user_data[] = [];

    if (permissionData.length > 0) {
      permissionData = await this.prisma.user_data.findMany({
        where: { id: { in: permittedDataIds } },
        include: {
          data_label: {
            select: { label: true },
          },
        },
      });
    }

    const permission = permissionData.filter(
      (p) => !findData.some((fd) => fd.id === p.id),
    );

    const friendData = [...findData, ...permission];

    return friendData;
  }

  async patchFriendConfidentiality(
    currentUserId: number,
    dto: PatchConfidentialityDto,
  ): Promise<PatchFriendConfidentialityResult> {
    const findFriendship: friendship | null =
      await this.prisma.friendship.findFirst({
        where: {
          OR: [
            { user1_id: currentUserId, user2_id: dto.friendId },
            { user2_id: currentUserId, user1_id: dto.friendId },
          ],
        },
      });

    if (!findFriendship) {
      throw new BadRequestException('Amitié non trouvée');
    }

    const result: friendship = await this.prisma.friendship?.update({
      where: { id: findFriendship?.id },
      data: {
        confidentiality_level_1:
          currentUserId === findFriendship?.user1_id
            ? dto.confidentiality
            : findFriendship?.confidentiality_level_1,
        confidentiality_level_2:
          currentUserId === findFriendship?.user2_id
            ? dto.confidentiality
            : findFriendship?.confidentiality_level_2,
      },
    });

    const confidentialityUpdated =
      currentUserId === findFriendship?.user1_id
        ? result.confidentiality_level_1
        : result.confidentiality_level_2;

    const friendId =
      currentUserId === findFriendship.user1_id
        ? findFriendship.user2_id
        : findFriendship.user1_id;

    return { friendId, confidentiality: confidentialityUpdated };
  }

  async remove(currentUserId: number, tag: string) {
    let user2Id: number | undefined;

    const otherFriend1 = await this.prisma.user.findUnique({
      where: { tag },
    });
    if (!otherFriend1) {
      throw new BadRequestException(`Utilisateur avec ce tag est introuvable`);
    }
    user2Id = otherFriend1.id;

    const findFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1_id: currentUserId, user2_id: user2Id },
          { user2_id: currentUserId, user1_id: user2Id },
        ],
      },
    });
    if (!findFriendship) {
      throw new BadRequestException('amitié non trouvé');
    }

    return this.prisma.friendship.delete({
      where: { id: findFriendship.id },
    });
  }
}
