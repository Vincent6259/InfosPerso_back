import { GroupPermissionService } from './group-permission.service';
import { CreateGroupPermissionDto } from './dto/create-group-permission.dto';
import { UpdateGroupPermissionDto } from './dto/update-group-permission.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { DeleteGroupPermissionDto } from './dto/delete-group-permission.dto';
export declare class GroupPermissionController {
    private readonly groupPermissionService;
    constructor(groupPermissionService: GroupPermissionService);
    createManyByGroup(request: AuthRequest, dto: CreateGroupPermissionDto): Promise<any>;
    findAllByGroup(request: AuthRequest, groupId: number): Promise<any[]>;
    updateManyByGroup(request: AuthRequest, updateGroupPermissionDto: UpdateGroupPermissionDto): Promise<any>;
    removeManyByGroup(request: AuthRequest, dto: DeleteGroupPermissionDto): Promise<any>;
    removeAllByGroup(request: AuthRequest, groupId: number): Promise<any>;
}
