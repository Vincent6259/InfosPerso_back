import { IsNotEmpty, IsEmail, IsStrongPassword, IsString } from 'class-validator';

export class randomDto {
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
