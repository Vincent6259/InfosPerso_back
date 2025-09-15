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
import { GroupService, returnGroupValue } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Req() request: AuthRequest, @Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(request.user.sub, createGroupDto);
  }

  @Get()
  findAll(@Req() request: AuthRequest): Promise<returnGroupValue | null> {
    return this.groupService.findAll(request.user.sub);
  }

  @Get(':id')
  findOne(@Req() request: AuthRequest, @Param('id') id: string) {
    return this.groupService.findOne(request.user.sub, +id);
  }

  @Patch(':id')
  update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(request.user.sub, +id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Req() request: AuthRequest, @Param('id') id: string) {
    return this.groupService.remove(request.user.sub, +id);
  }
}
