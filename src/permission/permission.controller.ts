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
import { PermissionService } from './permission.service';
import { AuthRequest } from 'src/authentication/authentication.guard';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post(':id/accepted')
  create(@Req() req: AuthRequest, @Param('id') requestId: number) {
    const user2Id = req.user!.sub;
    return this.permissionService.create(requestId, user2Id);
  }

  // @Get()
  // findAll() {
  //   return this.permissionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.permissionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
  //   return this.permissionService.update(+id, updatePermissionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.permissionService.remove(+id);
  // }
}
