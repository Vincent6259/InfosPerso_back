import { Test, TestingModule } from '@nestjs/testing';
import { FirendRequestController } from './friend_request.controller';
import { FirendRequestService } from './friend_request.service';

describe('FirendRequestController', () => {
  let controller: FirendRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirendRequestController],
      providers: [FirendRequestService],
    }).compile();

    controller = module.get<FirendRequestController>(FirendRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
