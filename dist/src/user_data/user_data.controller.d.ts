import { userDataReturned, UserDataService } from './user_data.service';
import { CreateUserDataDto } from './dto/create-user_data.dto';
import { UpdateUserDataDto } from './dto/update-user_data.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';
export declare class UserDataController {
    private readonly userDataService;
    constructor(userDataService: UserDataService);
    create(request: AuthRequest, createUserDataDto: CreateUserDataDto[]): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        content: string;
        user_id: number;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        label_id: number;
    }[]>;
    findAll(request: AuthRequest): Promise<userDataReturned[]>;
    update(dataId: number, updateUserDataDto: UpdateUserDataDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        content: string;
        user_id: number;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        label_id: number;
    }>;
    remove(dataId: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date | null;
        content: string;
        user_id: number;
        confidentiality: import("@prisma/client").$Enums.confidentiality;
        label_id: number;
    }>;
}
