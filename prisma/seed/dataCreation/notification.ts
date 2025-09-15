import { notification, user } from '@prisma/client';
import { shuffleArray } from '../utils';
import { prisma } from '..';
import { faker } from '@faker-js/faker';

const createNotification = async (
  count: number,
  users: user[],
): Promise<notification[]> => {
  const notifications: notification[] = [];
  while (count) {
    const [user] = shuffleArray<user>(users);
    notifications.push(
      await prisma.notification.create({
        data: {
          content: faker.lorem.lines(1),
          is_read: faker.datatype.boolean(),
          created_at: new Date(),
          updated_at: new Date(),
          user_id: user.id,
        },
      }),
    );
    count--;
  }
  return notifications;
};

export default createNotification;
