import { GroupMemberService, UserByGroup } from './group-member.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { DeleteGroupMemberDto } from './dto/delete-group-member.dto';
import { group_member } from '@prisma/client';
export declare class GroupMemberController {
    private readonly groupMemberService;
    constructor(groupMemberService: GroupMemberService);
    createOne(createGroupMemberDto: CreateGroupMemberDto): Promise<group_member>;
    findAllByGroup(group_id: number): Promise<UserByGroup[]>;
    remove(deleteGroupMemberDto: DeleteGroupMemberDto): Promise<group_member>;
}
