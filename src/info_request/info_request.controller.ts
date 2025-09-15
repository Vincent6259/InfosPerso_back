import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { InfoRequestService } from './info_request.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { CreateInfoRequestDto } from './dto/create-info_request.dto';

@Controller('info-request')
export class InfoRequestController {
  constructor(private readonly infoRequestService: InfoRequestService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateInfoRequestDto) {
    const user1Id = req.user.sub;
    return this.infoRequestService.create(user1Id, dto);
  }

  // @Get()
  // findAll() {
  //   return this.infoRequestService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.infoRequestService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInfoRequestDto: UpdateInfoRequestDto) {
  //   return this.infoRequestService.update(+id, updateInfoRequestDto);
  // }

  @Delete(':id/refused')
  remove(@Param('id') requestId: number) {
    return this.infoRequestService.requestRefused(requestId);
  }
}
