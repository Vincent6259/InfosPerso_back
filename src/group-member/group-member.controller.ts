import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GroupMemberService, UserByGroup } from './group-member.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { DeleteGroupMemberDto } from './dto/delete-group-member.dto';
import { group_member } from '@prisma/client';

@Controller('group-member')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}

  @Post()
  createOne(
    @Body() createGroupMemberDto: CreateGroupMemberDto,
  ): Promise<group_member> {
    return this.groupMemberService.createOne(createGroupMemberDto);
  }

  @Get(':group_id')
  findAllByGroup(
    @Param('group_id', ParseIntPipe) group_id: number,
  ): Promise<UserByGroup[]> {
    if (!group_id || group_id <= 0) {
      throw new HttpException('Group ID is incorrect', HttpStatus.BAD_REQUEST);
    }
    return this.groupMemberService.findAllByGroup(group_id);
  }

  @Delete()
  remove(
    @Body() deleteGroupMemberDto: DeleteGroupMemberDto,
  ): Promise<group_member> {
    return this.groupMemberService.remove(deleteGroupMemberDto);
  }
}
