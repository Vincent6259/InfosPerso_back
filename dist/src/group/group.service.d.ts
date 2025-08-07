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
export declare class GroupService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createGroupDto: CreateGroupDto): Promise<group>;
    findAll(userId: number): Promise<returnGroupValue | null>;
    findOne(id: number, group_id: number): Promise<{
        id: number;
        name: string;
        description: string;
        creator_id: number;
        group_permission: {
            data_label_id: number;
            data_label: {
                label: string;
            };
        }[];
    } | null>;
    update(user_id: number, group_id: number, updateGroupDto: UpdateGroupDto): Promise<group>;
    remove(user_id: number, group_id: number): Promise<void>;
}
export {};
