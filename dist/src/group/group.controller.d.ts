import { GroupService, returnGroupValue } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(request: AuthRequest, createGroupDto: CreateGroupDto): Promise<{
        id: number;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
        creator_id: number;
    }>;
    findAll(request: AuthRequest): Promise<returnGroupValue | null>;
    findOne(request: AuthRequest, id: string): Promise<{
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
    update(request: AuthRequest, id: string, updateGroupDto: UpdateGroupDto): Promise<{
        id: number;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
        creator_id: number;
    }>;
    remove(request: AuthRequest, id: string): Promise<void>;
}
