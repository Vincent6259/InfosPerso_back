import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    sharedData: number[];

    @IsNotEmpty()
    invitedMembers: number[];
}
