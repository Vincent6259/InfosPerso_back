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
import { FriendRequestService } from './friend_request.service';
import { CreateFriendRequestDto } from './dto/create-friend_request.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Post()
  create(
    @Body() createFriendRequestDto: CreateFriendRequestDto,
    @Req() req: AuthRequest,
  ) {
    const user1Id = req.user.sub;
    return this.friendRequestService.create(createFriendRequestDto, user1Id);
  }

  // @Get()
  // findAll() {
  //   return this.firendRequestService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.firendRequestService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFirendRequestDto: UpdateFirendRequestDto) {
  //   return this.firendRequestService.update(+id, updateFirendRequestDto);
  // }

  @Delete(':id/refused')
  remove(@Param('id') requestId: number) {
    return this.friendRequestService.requestRefused(requestId);
  }
}
