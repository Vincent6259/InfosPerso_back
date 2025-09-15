import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'prisma/prisma.service';
import { group } from '@prisma/client';

interface BasicInfoGroup {
  group: {
    id: number;
    name: string;
  };
}

export interface returnGroupValue {
  group_members: BasicInfoGroup[];
}

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createGroupDto: CreateGroupDto): Promise<group> {
    const createdGroup = await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        description: createGroupDto.description,
        creator_id: userId,
      },
    });

    await this.prisma.group_member.create({
      data: {
        group_id: createdGroup.id,
        user_id: userId,
      },
    });

    if (createGroupDto.sharedData?.length) {
      const sharedData = createGroupDto.sharedData.map((labelId) => ({
        group_id: createdGroup.id,
        data_label_id: labelId,
      }));
      await this.prisma.group_permission.createMany({
        data: sharedData,
      });
    }

    if (createGroupDto.invitedMembers?.length) {
      const groupRequests = createGroupDto.invitedMembers.map((memberId) => ({
        sender_id: userId,
        receiver_id: memberId,
        group_id: createdGroup.id,
      }));
      await this.prisma.group_request.createMany({
        data: groupRequests,
      });
    }

    return createdGroup
  }

  async findAll(userId: number): Promise<returnGroupValue | null> {
    const groups = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        group_members: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
                creator_id: true
              },
            },
          },
        },
      },
    });

    return groups;
  }

  async findOne(id: number, group_id: number) {
    const isMember = await this.prisma.group_member.findFirst({
      where: {
        AND: {
          user_id: {
            equals: id
          },
          group_id: {
            equals: group_id
          }
        }
      }
    })
    if(!isMember) {
      throw new HttpException('Not a member', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.group.findFirst({
      where: {
        id: group_id
      }, select: {
        id: true,
        name: true,
        description: true,
        creator_id: true,
        group_permission: {
            select: {
            data_label_id: true,
            data_label: {
              select: {
                label: true
              }
            }
          }
        }
      }
    })
  }

  async update(user_id: number, group_id: number, updateGroupDto: UpdateGroupDto): Promise<group> {
    const pickedGroup = await this.prisma.group.findUnique({
      where: {
        id: group_id
      }
    })
    if(pickedGroup?.creator_id !== user_id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.group.update({
      where: { id: group_id },
      data: updateGroupDto,
    });
  }

  async remove(user_id: number, group_id: number): Promise<void> {
    const pickedGroup = await this.prisma.group.findUnique({
      where: {
        id: group_id
      }
    })
    if(pickedGroup?.creator_id !== user_id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    await this.prisma.group_request.deleteMany({
      where: {
        group_id
      }
    })

    await this.prisma.group_permission.deleteMany({
      where: {
        group_id
      }
    })

    await this.prisma.group_member.deleteMany({
      where: {
        group_id
      }
    })

    await this.prisma.group.delete({
      where: {
        id: group_id
      }
    })
  }
}
