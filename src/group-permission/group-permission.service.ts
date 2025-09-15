import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupPermissionDto } from './dto/create-group-permission.dto';
import { UpdateGroupPermissionDto } from './dto/update-group-permission.dto';
import { PrismaService } from 'prisma/prisma.service';
import { data_label, group, group_permission } from '@prisma/client';
import { DeleteGroupPermissionDto } from './dto/delete-group-permission.dto';

export interface findAllByGroupReturn {
  data_label: {
    id: number;
    label: string;
  };
}
export interface groupPermissionReturn {
  group_permission: {
    data_label_id: number;
  }[];
}

@Injectable()
export class GroupPermissionService {

  constructor(private readonly prisma: PrismaService) { }

  async createManyByGroup(currentUserId: number, dto: CreateGroupPermissionDto): Promise<any> {
    await this.checkGroupOwner(dto.group_id, currentUserId);
    return await this.prisma.group_permission.createMany({
      data: dto.data_label_ids.map((dataLabelId) => ({
        group_id: dto.group_id,
        data_label_id: dataLabelId,
      })),
    });
  }

  async findAllByGroup(currentUserId: number, groupId: number): Promise<findAllByGroupReturn[]> {
    await this.checkGroupOwner(groupId, currentUserId);
    return await this.prisma.group_permission.findMany({
      where: { group_id: groupId },
      select: {
        data_label: {
          select: {
            id: true,
            label: true,
          },
        }
      }
    });
  }

  async updateManyByGroup(currentUserId: number, dto: UpdateGroupPermissionDto): Promise<any> {
    await this.checkGroupOwner(dto.group_id, currentUserId);
    await this.reverseRemoveManyByGroup(dto);
    return await this.createManyByGroup(currentUserId, dto);
  }

  async removeManyByGroup(currentUserId: number, dto: DeleteGroupPermissionDto): Promise<any> {
    await this.checkGroupOwner(dto.group_id, currentUserId);
    return await this.prisma.group_permission.deleteMany({
      where: {
        group_id: dto.group_id,
        data_label_id: { in: dto.data_label_ids },
      },
    });
  }

  async removeAllByGroup(currentUserId: number, groupId: number): Promise<any> {
    //TODO: return "count 0" même si des permission ont été supprimer
    await this.checkGroupOwner(groupId, currentUserId);
    return await this.prisma.group_permission.deleteMany({
      where: {
        group_id: groupId,
      },
    });
  }



  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------



  private async checkGroupOwner(groupId: number, userId: number) {
    const group: group | null = await this.prisma.group.findUnique({
      where: { id: groupId, creator_id: userId },
    });
    if (!group) {
      throw new HttpException('You are not the owner of this group!', HttpStatus.FORBIDDEN)
    }
    return group;
  }

  private async reverseRemoveManyByGroup(dto: DeleteGroupPermissionDto): Promise<any> {
    return await this.prisma.group_permission.deleteMany({
      where: {
        group_id: dto.group_id,
        data_label_id: { notIn: dto.data_label_ids },
      },
    });
  }

}
