import { faker } from '@faker-js/faker';
import { user } from '@prisma/client';
import { prisma } from '..';
import * as argon2 from 'argon2';

const createUser = async (number: number): Promise<user[]> => {
  const users: user[] = [];
  while (number) {
    const tag = faker.string.alphanumeric(10);
    const randomPassword = 'Password123!';
    const hashedPassword = await argon2.hash(randomPassword);
    users.push(
      await prisma.user.upsert({
        where: { tag },
        update: {},
        create: {
          tag,
          hashRefreshToken: '',
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
      }),
    );
    number--;
  }
  return users;
};

export default createUser;
