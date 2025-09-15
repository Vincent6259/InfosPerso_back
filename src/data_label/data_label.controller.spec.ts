import { Test, TestingModule } from '@nestjs/testing';
import { DataLabelController } from './data_label.controller';
import { DataLabelService } from './data_label.service';

describe('DataLabelController', () => {
  let controller: DataLabelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataLabelController],
      providers: [DataLabelService],
    }).compile();

    controller = module.get<DataLabelController>(DataLabelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
