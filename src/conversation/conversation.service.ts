import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { conversation, friendship, group } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

export interface IfindOneReturn {
  id: number;
  messages: {
    id: number;
    content: string;
    user: {
      id: number;
      tag: string;
      user_data: {
        content: string;
        data_label: {
          label: string;
        };
      }[];
    };
  }[];
}

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createOne(
    currentUserId: number,
    dtoData: CreateConversationDto,
  ): Promise<conversation> {
    if (
      (dtoData.group_id && dtoData.friendship_id) ||
      (!dtoData.group_id && !dtoData.friendship_id)
    ) {
      throw new HttpException(
        'Bad request DTO, Create Conversation',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Cas 1 : Si l'utilisateur est le créateur du groupe, il peut créer une conversation avec le groupe
    else if (dtoData.group_id) {
      if (
        await this.checkIfUserIsOwnerForCreate(dtoData.group_id, currentUserId)
      ) {
        return this.prisma.conversation.create({
          data: {
            group_id: dtoData.group_id,
          },
        });
      } else {
        throw new HttpException(
          'You are not the owner of this group!',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    //Cas 2 : Si l'utilisateur est membre de l'amitié, il peut créer une conversation avec cette ami
    else if (dtoData.friendship_id) {
      if (
        await this.checkIfUserIsMemberForCreate(
          dtoData.friendship_id,
          currentUserId,
        )
      ) {
        return this.prisma.conversation.create({
          data: {
            friendship_id: dtoData.friendship_id,
          },
        });
      } else {
        throw new HttpException(
          'You are not a member of this friendship!',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException(
        'Bad request DTO, Create Conversation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(
    currentUserId: number,
    idConversation: number,
  ): Promise<IfindOneReturn | null> {
    if (await this.checkIfUserIsMember(idConversation, currentUserId)) {
      return this.prisma.conversation.findUnique({
        where: { id: idConversation },
        select: {
          id: true,
          messages: {
            select: {
              id: true,
              content: true,
              user: {
                select: {
                  id: true,
                  tag: true,
                  user_data: {
                    where: { label_id: { in: [1, 2] } },
                    select: {
                      content: true,
                      data_label: { select: { label: true } },
                    },
                  },
                },
              },
            },
          },
        },
      });
    } else {
      throw new HttpException(
        'You are not a member of this conversation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async deleteOne(
    currentUserId: number,
    idConversation: number,
  ): Promise<conversation> {
    if (
      await this.checkConversationFriendshipOrOwner(
        idConversation,
        currentUserId,
      )
    ) {
      await this.prisma.message.deleteMany({
        where: { conversation_id: idConversation },
      });
      return await this.prisma.conversation.delete({
        where: { id: idConversation },
      });
    } else {
      throw new HttpException(
        'You are not a member or the owner of this conversation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------

  private async checkIfUserIsOwnerForCreate(
    idGroup: number,
    currentUserId: number,
  ): Promise<boolean> {
    const group: group | null = await this.prisma.group.findUnique({
      where: {
        id: idGroup,
        creator_id: currentUserId,
      },
    });

    if (group) {
      return true;
    } else {
      return false;
    }
  }

  private async checkIfUserIsMemberForCreate(
    idFriendship: number,
    currentUserId: number,
  ): Promise<boolean> {
    const friendship: friendship | null =
      await this.prisma.friendship.findUnique({
        where: {
          id: idFriendship,
          OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
        },
      });

    if (friendship) {
      return true;
    } else {
      return false;
    }
  }

  private async checkIfUserIsMember(
    idConversation: number,
    currentUserId: number,
  ): Promise<boolean> {
    const conversation: any = await this.prisma.conversation.findUnique({
      where: { id: idConversation },
      select: {
        friendship: {
          where: {
            OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
          },
        },
        group: {
          where: {
            group_members: {
              some: {
                user_id: currentUserId,
              },
            },
          },
        },
      },
    });

    if (conversation?.group || conversation?.friendship) {
      return true;
    } else {
      return false;
    }
  }

  private async checkConversationFriendshipOrOwner(
    idConversation: number,
    currentUserId: number,
  ): Promise<boolean> {
    const conversation: any = await this.prisma.conversation.findUnique({
      where: { id: idConversation },
      select: {
        friendship: {
          where: {
            OR: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
          },
        },
        group: {
          where: {
            creator_id: currentUserId,
          },
        },
      },
    });

    if (conversation?.group || conversation?.friendship) {
      return true;
    } else {
      return false;
    }
  }
}
