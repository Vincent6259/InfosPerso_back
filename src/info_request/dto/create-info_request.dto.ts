import { IsOptional, IsString } from 'class-validator';

export class CreateInfoRequestDto {
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  Prénom?: string;

  @IsOptional()
  @IsString()
  Nom?: string;
}
