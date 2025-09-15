import { user_data, user, data_label } from '@prisma/client';
import seedValues from '../../seedValues';
import createUserLastname from './userLastname';
import createUserFirstname from './userFirstname';
import createUserMail from './userMail';
import createUserAdress from './userAdress';
import createUserPhone from './userPhone';
import createOtherUserData from './otherUserData';

const createUserData = async (
  users: user[],
  dataLabels: data_label[],
): Promise<user_data[]> => {
    const allUserDatas: user_data[] = [];

    const usersFirstnames = await createUserFirstname(users);
    allUserDatas.push(...usersFirstnames); // Ajout des prénoms

    const usersLastnames = await createUserLastname(users);
    allUserDatas.push(...usersLastnames); // Ajout des noms de famille

    const usersMails = await createUserMail(users);
    allUserDatas.push(...usersMails); // Ajout des emails

    const userAddresses = await createUserAdress(users);
    allUserDatas.push(...userAddresses); // Ajout des adresses

    const userPhones = await createUserPhone(users);
    allUserDatas.push(...userPhones); // Ajout des numéros de téléphone

    const otherUserDatas = await createOtherUserData(users, dataLabels);
    allUserDatas.push(...otherUserDatas); // Ajout des autres données utilisateur

  return allUserDatas;
};

export default createUserData;
