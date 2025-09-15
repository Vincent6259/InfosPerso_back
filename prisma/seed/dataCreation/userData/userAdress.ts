import { confidentiality, user, user_data } from '@prisma/client';
import { prisma } from '../..';
import { faker } from '@faker-js/faker';

const createUserAdress = async (users: user[]): Promise<user_data[]> => {
    const userAddresses: user_data[] = [];

    for(let i = 0; i < users.length; i++) {
        userAddresses.push(
            await prisma.user_data.create({
                data: {
                    content: faker.location.streetAddress(),
                    user_id: users[i].id,
                    label_id: 4,
                    confidentiality: faker.helpers.enumValue(confidentiality),
                }
            })
        )
    }

    return userAddresses
}

export default createUserAdress;