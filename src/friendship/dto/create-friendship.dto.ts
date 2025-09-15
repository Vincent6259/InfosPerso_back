import { $Enums } from '@prisma/client';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateFriendshipDto {
  @IsNotEmpty()
  @IsIn(['MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM'])
  confidentiality: $Enums.confidentiality;
}
