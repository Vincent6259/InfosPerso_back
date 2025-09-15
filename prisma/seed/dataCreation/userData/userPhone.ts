import { confidentiality, user, user_data } from '@prisma/client';
import { prisma } from '../..';
import { faker } from '@faker-js/faker';

const createUserPhone = async (users: user[]): Promise<user_data[]> => {
    const userPhones: user_data[] = [];

    for(let i = 0; i < users.length; i++) {
        userPhones.push(
            await prisma.user_data.create({
                data: {
                    content: faker.phone.number({ style: 'international' }),
                    user_id: users[i].id,
                    label_id: 5,
                    confidentiality: faker.helpers.enumValue(confidentiality),
                }
            })
        )
    }

    return userPhones
}

export default createUserPhone;