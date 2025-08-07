import { confidentiality } from "@prisma/client";
export declare class CreateUserDataDto {
    label: string;
    content: string;
    confidentiality: confidentiality;
}
