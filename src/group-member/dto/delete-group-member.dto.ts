import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class DeleteGroupMemberDto {
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    group_id: number;
}
