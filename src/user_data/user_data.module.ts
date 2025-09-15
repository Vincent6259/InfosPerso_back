import { Module } from '@nestjs/common';
import { UserDataService } from './user_data.service';
import { UserDataController } from './user_data.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [UserDataController],
  providers: [UserDataService, UserService],
})
export class UserDataModule {}
