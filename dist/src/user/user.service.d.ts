import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        tag: string;
        hashRefreshToken: string;
        password: string;
        created_at: Date;
        updated_at: Date | null;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        tag: string;
        hashRefreshToken: string;
        password: string;
        created_at: Date;
        updated_at: Date | null;
    }>;
}
