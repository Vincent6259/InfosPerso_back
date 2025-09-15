import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { DeleteGroupMemberDto } from './dto/delete-group-member.dto';
import { group_member } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

export interface UserData {
  content: string;
  data_label: {
    label: string;
  };
}

export interface UserByGroup {
  user_id: number;
  user: {
    tag: string;
    user_data?: UserData[];
  };
}

@Injectable()
export class GroupMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(
    createGroupMemberDto: CreateGroupMemberDto,
  ): Promise<group_member> {
    const groupMember = await this.prisma.group_member.create({
      data: {
        group_id: createGroupMemberDto.group_id,
        user_id: createGroupMemberDto.user_id,
      },
    });
    if (!groupMember) {
      throw new HttpException(
        'This member is already in this group',
        HttpStatus.CONFLICT,
      );
    }
    return groupMember;
  }

  async findAllByGroup(group_id: number): Promise<UserByGroup[]> {
    const groupMembers = await this.prisma.group_member.findMany({
      where: { group_id },
      select: {
        user_id: true,
        user: {
          select: {
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
    });
    return groupMembers;
  }

  async remove(
    deleteGroupMemberDto: DeleteGroupMemberDto,
  ): Promise<group_member> {
    const groupMember = await this.prisma.group_member.delete({
      where: {
        group_id_user_id: {
          group_id: deleteGroupMemberDto.group_id,
          user_id: deleteGroupMemberDto.user_id,
        },
      },
    });
    return groupMember;
  }
}
