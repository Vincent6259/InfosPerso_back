import { Test, TestingModule } from '@nestjs/testing';
import { DataLabelService } from './data_label.service';

describe('DataLabelService', () => {
  let service: DataLabelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataLabelService],
    }).compile();

    service = module.get<DataLabelService>(DataLabelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
