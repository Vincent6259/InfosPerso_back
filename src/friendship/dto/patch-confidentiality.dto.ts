import { $Enums } from '@prisma/client';
import { IsIn, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PatchConfidentialityDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  friendId: number;

  @IsNotEmpty()
  @IsIn(['MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM'])
  confidentiality: $Enums.confidentiality;
}
