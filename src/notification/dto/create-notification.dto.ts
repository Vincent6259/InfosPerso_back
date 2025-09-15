import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateNotificationDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    content: string;
    
}
