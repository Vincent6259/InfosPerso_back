import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoRequestDto } from './create-info_request.dto';

export class UpdateInfoRequestDto extends PartialType(CreateInfoRequestDto) {}
