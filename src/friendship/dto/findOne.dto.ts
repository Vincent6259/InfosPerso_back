import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class findFriendDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  friendId: number;
}
