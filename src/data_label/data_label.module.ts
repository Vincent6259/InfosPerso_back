import { Module } from '@nestjs/common';
import { DataLabelService } from './data_label.service';
import { DataLabelController } from './data_label.controller';

@Module({
  controllers: [DataLabelController],
  providers: [DataLabelService],
})
export class DataLabelModule {}
