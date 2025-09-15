import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  const mockPrismaService = {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    mockPrismaService.notification.create.mockClear();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a notification', async () => {

    const mockNotification = {
      user_id: faker.number.int(),
      content: faker.lorem.lines(1)
    }

    const prismaResponse = {
      id: faker.number.int(),
      is_read: false,
      created_at: new Date(),
      updated_at: null,
      ...mockNotification
    }

    mockPrismaService.notification.create.mockResolvedValue(prismaResponse)

    const result = await service.create(mockNotification)

    expect(result).toEqual(prismaResponse)
    expect(mockPrismaService.notification.create).toHaveBeenCalledTimes(1)
    expect(mockPrismaService.notification.create).toHaveBeenCalledWith({
      data: {
        user_id: mockNotification.user_id,
        content: mockNotification.content
      }
    })

  })

  describe('create method', () => {
    it('Should throw error on notification creation', async () => {

      const mockNotification = {
        user_id: faker.number.int(),
        content: faker.lorem.lines(1)
      }

      mockPrismaService.notification.create.mockResolvedValue(new Error(`user_id doesn't exist`))
      const result = await service.create(mockNotification)

      expect(result).toBeInstanceOf(Error);
      expect(mockPrismaService.notification.create).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.notification.create).toHaveBeenCalledWith({
        data: {
          user_id: mockNotification.user_id,
          content: mockNotification.content
        }
      })

    })


  })

});

