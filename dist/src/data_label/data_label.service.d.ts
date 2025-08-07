import { PrismaService } from 'prisma/prisma.service';
export declare class DataLabelService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        label: string;
    }[]>;
}
