import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe, Put } from '@nestjs/common';
import { GroupPermissionService } from './group-permission.service';
import { CreateGroupPermissionDto } from './dto/create-group-permission.dto';
import { UpdateGroupPermissionDto } from './dto/update-group-permission.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { DeleteGroupPermissionDto } from './dto/delete-group-permission.dto';

@Controller('group-permission')
export class GroupPermissionController {
  constructor(private readonly groupPermissionService: GroupPermissionService) {}

  @Post()
  async createManyByGroup(@Req() request: AuthRequest, @Body() dto: CreateGroupPermissionDto) : Promise<any> {
    return await this.groupPermissionService.createManyByGroup(request.user!.sub, dto);
  }

  @Get(':groupId')
  async findAllByGroup(@Req() request: AuthRequest, @Param('groupId', ParseIntPipe) groupId: number) : Promise<any[]> {
    return await this.groupPermissionService.findAllByGroup(request.user!.sub, groupId);
  }

  @Put()
  async updateManyByGroup(@Req() request: AuthRequest, @Body() updateGroupPermissionDto: UpdateGroupPermissionDto) {
    return await this.groupPermissionService.updateManyByGroup(request.user!.sub, updateGroupPermissionDto);
  }

  @Delete()
  async removeManyByGroup(@Req() request: AuthRequest, @Body() dto: DeleteGroupPermissionDto) : Promise<any> {
    return await this.groupPermissionService.removeManyByGroup(request.user!.sub, dto);
  }

  @Delete(':groupId')
  async removeAllByGroup(@Req() request: AuthRequest, @Param('groupId', ParseIntPipe) groupId: number) : Promise<any> {
    return await this.groupPermissionService.removeAllByGroup(request.user!.sub, groupId);
  }
}
