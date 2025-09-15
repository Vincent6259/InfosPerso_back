import { confidentiality, user, user_data } from '@prisma/client';
import { prisma } from '../..';
import { faker } from '@faker-js/faker';

const createUserMail = async (users: user[]): Promise<user_data[]> => {
    const userMails: user_data[] = [];

    for(let i = 0; i < users.length; i++) {
        userMails.push(
            await prisma.user_data.create({
                data: {
                    content: faker.internet.email(),
                    user_id: users[i].id,
                    label_id: 3,
                    confidentiality: faker.helpers.enumValue(confidentiality),
                }
            })
        )
    }

    return userMails
}

export default createUserMail;