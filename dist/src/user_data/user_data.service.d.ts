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
export declare class UserDataService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createUserDataDto: CreateUserDataDto[]): Promise<user_data[]>;
    findAll(userId: number): Promise<userDataReturned[]>;
    update(id: number, updateUserDataDto: UpdateUserDataDto): Promise<user_data>;
    remove(id: number): Promise<user_data>;
}
