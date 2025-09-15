import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DataLabelService {

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.data_label.findMany()
  }
}
