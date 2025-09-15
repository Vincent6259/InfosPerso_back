import { confidentiality, user, user_data } from '@prisma/client';
import { prisma } from '../..';
import { faker } from '@faker-js/faker';

const createUserFirstname = async (users: user[]): Promise<user_data[]> => {
    const userFirstnames: user_data[] = [];

    for(let i = 0; i < users.length; i++) {
        userFirstnames.push(
            await prisma.user_data.create({
                data: {
                    content: faker.person.firstName(),
                    user_id: users[i].id,
                    label_id: 2,
                    confidentiality: faker.helpers.enumValue(confidentiality),
                }
            })
        )
    }

    return userFirstnames
}

export default createUserFirstname;