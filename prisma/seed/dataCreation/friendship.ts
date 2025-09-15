import { friendship, confidentiality, user } from '@prisma/client';
import { shuffleArray } from '../utils';
import { prisma } from '..';
import { faker } from '@faker-js/faker';

const createFriendship = async (
  number: number,
  users: user[],
): Promise<friendship[]> => {
  const friendships: friendship[] = [];
  while (number) {
    const [user1, user2] = shuffleArray<user>(users);

    if (user1.id > user2.id) {
      const biggerId = user1.id;
      user1.id = user2.id;
      user2.id = biggerId;
    }

    if(friendships.find(friendship => friendship.user1_id === user1.id && friendship.user2_id === user2.id)) {
      continue
    }

    else {

      friendships.push(
        await prisma.friendship.create({
          data: {
            user1_id: user1.id,
            confidentiality_level_1: faker.helpers.enumValue(confidentiality),
            user2_id: user2.id,
            confidentiality_level_2: faker.helpers.enumValue(confidentiality),
          },
        }),
      );
      number--;
    }

  }
  return friendships;
};

export default createFriendship;
