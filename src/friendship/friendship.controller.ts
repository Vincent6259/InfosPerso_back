import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendDto } from './dto/friendInterface';
import { PatchConfidentialityDto } from './dto/patch-confidentiality.dto';
import { PatchFriendConfidentialityResult } from './dto/updateFriendInterface';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post(':id/accepted')
  async create(
    @Req() req: AuthRequest,
    @Param('id') requestId: number,
    @Body() dto: CreateFriendshipDto,
  ) {
    const user2Id = req.user.sub;

    return await this.friendshipService.create(requestId, user2Id, dto);
  }

  @Get()
  async findAll(@Req() request: AuthRequest): Promise<FriendDto[]> {
    const user1Id = request.user.sub;
    return await this.friendshipService.findAll(user1Id);
  }

  @Get('/:friendId')
  async findOne(
    @Req() request: AuthRequest,
    @Param('friendId', ParseIntPipe) friendId: number,
  ) {
    const currentUserId = request.user.sub;
    return await this.friendshipService.findOne(currentUserId, friendId);
  }

  @Patch()
  async patchFriendConfidentiality(
    @Req() request: AuthRequest,
    @Body() dto: PatchConfidentialityDto,
  ): Promise<PatchFriendConfidentialityResult> {
    const currentUserId = request.user.sub;
    return await this.friendshipService.patchFriendConfidentiality(
      currentUserId,
      dto,
    );
  }

  @Delete()
  async remove(@Req() req: AuthRequest, @Body() tag: string) {
    const currentUserId = req.user.sub;
    return await this.friendshipService.remove(currentUserId, tag);
  }
}
