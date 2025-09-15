import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateConversationDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    group_id?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    friendship_id?: number;
}
