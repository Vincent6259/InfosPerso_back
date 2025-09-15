import { group, user } from "@prisma/client";
import { shuffleArray } from "../utils";
import { prisma } from "..";
import { faker } from "@faker-js/faker";

const createGroup = async (number: number, users: user[]): Promise<group[]> => {
    const groups: group[] = [];
  
    while (number) {
      const [groupCreator] = shuffleArray<user>(users);
  
      groups.push(
        await prisma.group.create({
          data: {
            name: faker.lorem.words({ min: 5, max: 10 }),
            description: faker.lorem.words({ min: 10, max: 25 }),
            created_at: new Date(),
            updated_at: new Date(),
            creator_id: groupCreator.id,
          },
        }),
      );
      number--;
    }
  
    return groups;
  };

  export default createGroup