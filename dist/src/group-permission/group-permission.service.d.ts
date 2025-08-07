import { CreateGroupPermissionDto } from './dto/create-group-permission.dto';
import { UpdateGroupPermissionDto } from './dto/update-group-permission.dto';
import { PrismaService } from 'prisma/prisma.service';
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
export declare class GroupPermissionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createManyByGroup(currentUserId: number, dto: CreateGroupPermissionDto): Promise<any>;
    findAllByGroup(currentUserId: number, groupId: number): Promise<findAllByGroupReturn[]>;
    updateManyByGroup(currentUserId: number, dto: UpdateGroupPermissionDto): Promise<any>;
    removeManyByGroup(currentUserId: number, dto: DeleteGroupPermissionDto): Promise<any>;
    removeAllByGroup(currentUserId: number, groupId: number): Promise<any>;
    private checkGroupOwner;
    private reverseRemoveManyByGroup;
}
