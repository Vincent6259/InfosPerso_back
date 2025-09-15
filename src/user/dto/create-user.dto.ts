import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { SignInDto } from '../../authentication/dto/signin.dto';

export class CreateUserDto extends SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  confirmPassword: string;
}
