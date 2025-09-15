import { user_data, user, data_label, confidentiality } from '@prisma/client';
import { shuffleArray } from '../../utils';
import { prisma } from '../..';
import { faker } from '@faker-js/faker';

const createOtherUserData = async ( users: user[], dataLabels: data_label[] ): Promise<user_data[]> => {

  const [data_label] = shuffleArray<data_label>(
    dataLabels.filter(data => ![1, 2, 3, 4, 5].includes(data.id))
  );

  if (!data_label) {
    return [];
  }

  const userDatas = await Promise.all(
    users.map(async (user) => {
      return prisma.user_data.create({
        data: {
          content: faker.lorem.words({ min: 1, max: 5 }),
          user_id: user.id,
          label_id: data_label.id,
          confidentiality: faker.helpers.enumValue(confidentiality),
        },
      });
    })
  );

  return userDatas.filter((data): data is user_data => data !== null);
};

export default createOtherUserData;