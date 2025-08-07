import { DataLabelService } from './data_label.service';
export declare class DataLabelController {
    private readonly dataLabelService;
    constructor(dataLabelService: DataLabelService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        label: string;
    }[]>;
}
