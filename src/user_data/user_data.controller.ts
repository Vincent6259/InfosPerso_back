import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  Param,
} from '@nestjs/common';
import { userDataReturned, UserDataService } from './user_data.service';
import { CreateUserDataDto } from './dto/create-user_data.dto';
import { UpdateUserDataDto } from './dto/update-user_data.dto';
import { AuthRequest } from 'src/authentication/authentication.guard';

@Controller('user-data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Post()
  async create(
    @Req() request: AuthRequest,
    @Body() createUserDataDto: CreateUserDataDto[],
  ) {
    return await this.userDataService.create(
      request.user.sub,
      createUserDataDto,
    );
  }

  @Get()
  async findAll(@Req() request: AuthRequest): Promise<userDataReturned[]> {
    return this.userDataService.findAll(request.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') dataId: number,
    @Body() updateUserDataDto: UpdateUserDataDto,
  ) {
    return this.userDataService.update(dataId, updateUserDataDto);
  }

  @Delete(':id')
  remove(@Param('id') dataId: number) {
    return this.userDataService.remove(dataId);
  }
}
