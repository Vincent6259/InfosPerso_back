import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateGroupPermissionDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    group_id: number;

    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @IsPositive({ each: true })
    data_label_ids: number[];
}