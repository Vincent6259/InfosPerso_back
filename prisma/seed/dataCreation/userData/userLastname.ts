import { confidentiality, user, user_data } from '@prisma/client';
import { prisma } from '../..';
import { faker } from '@faker-js/faker';

const createUserLastname = async (users: user[]): Promise<user_data[]> => {
    const userLastnames: user_data[] = [];

    for(let i = 0; i < users.length; i++) {
        userLastnames.push(
            await prisma.user_data.create({
                data: {
                    content: faker.person.lastName(),
                    user_id: users[i].id,
                    label_id: 1,
                    confidentiality: faker.helpers.enumValue(confidentiality),
                }
            })
        )
    }

    return userLastnames
}

export default createUserLastname;