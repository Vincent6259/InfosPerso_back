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
export declare class GroupMemberService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOne(createGroupMemberDto: CreateGroupMemberDto): Promise<group_member>;
    findAllByGroup(group_id: number): Promise<UserByGroup[]>;
    remove(deleteGroupMemberDto: DeleteGroupMemberDto): Promise<group_member>;
}
