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
  Req,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { IfindOneReturn } from './conversation.service';
import { conversation } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async createOne(
    @Req() request: AuthRequest,
    @Body() dtoData: CreateConversationDto,
  ): Promise<conversation> {
    return await this.conversationService.createOne(request.user.sub, dtoData);
  }

  @Get(':idConversation')
  async findOne(
    @Req() request: AuthRequest,
    @Param('idConversation', ParseIntPipe) idConversation: number,
  ): Promise<IfindOneReturn | null> {
    return await this.conversationService.findOne(
      request.user.sub,
      idConversation,
    );
  }

  @Delete(':idConversation')
  async deleteOne(
    @Req() request: AuthRequest,
    @Param('idConversation', ParseIntPipe) idConversation: number,
  ): Promise<conversation> {
    return await this.conversationService.deleteOne(
      request.user.sub,
      idConversation,
    );
  }
}
