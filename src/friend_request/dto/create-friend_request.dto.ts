import { $Enums } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';

export class CreateFriendRequestDto {
  @IsString()
  tag: string;

  @IsIn(['MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM'])
  confidentiality: $Enums.confidentiality;
}
