import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { confidentiality, user_data } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDataDto } from './dto/create-user_data.dto';
import { UpdateUserDataDto } from './dto/update-user_data.dto';

export interface userDataReturned {
  id: number;
  content: string;
  confidentiality: confidentiality;
  data_label: {
    label: string;
  };
}

@Injectable()
export class UserDataService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    createUserDataDto: CreateUserDataDto[],
  ): Promise<user_data[]> {

    const userDatas: user_data[] = []

    for (const dto of createUserDataDto) {
      const foundLabel = await this.prisma.data_label.findFirst({
        where: { label: dto.label },
      });
      if (!foundLabel) {
        throw new HttpException('Label not found', HttpStatus.NOT_FOUND);
      }

      const existing = await this.prisma.user_data.findFirst({
        where: {
          label_id: foundLabel.id,
          user_id: userId,
        },
      });
      if (existing) {
        throw new HttpException(
          'Label already exists for this user',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userData = await this.prisma.user_data.create({
        data: {
          user_id: userId,
          content: dto.content,
          confidentiality: dto.confidentiality,
          label_id: foundLabel.id,
        },
      });

      userDatas.push(userData)
    }

    return userDatas
  }

  async findAll(userId: number): Promise<userDataReturned[]> {
    return this.prisma.user_data.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        content: true,
        confidentiality: true,
        data_label: {
          select: { label: true },
        },
      },
    });
  }

  async update(
    id: number,
    updateUserDataDto: UpdateUserDataDto,
  ): Promise<user_data> {
    return this.prisma.user_data.update({
      where: { id },
      data: updateUserDataDto,
    });
  }

  async remove(id: number): Promise<user_data> {
    return this.prisma.user_data.delete({
      where: { id },
    });
  }
}
