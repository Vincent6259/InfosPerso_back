// import { request, friendship, request_type } from "@prisma/client";
// import { shuffleArray } from "../utils";
// import { prisma } from "..";
// import { faker } from "@faker-js/faker";

// const createRequest = async (count: number, friendships: friendship[]): Promise<request[]> => {
//     const requests: request[] = [];
//     while (count) {
//         const [friendship] = shuffleArray<friendship>(friendships);
//         requests.push(
//             await prisma.request.create({
//                 data: {
//                     is_accepted: faker.datatype.boolean(),
//                     sender_id: count % 2 === 0 ? friendship.user1_id : friendship.user2_id,
//                     receiver_id: count % 2 === 0 ? friendship.user2_id : friendship.user1_id,
//                     type: faker.helpers.enumValue(
//                         request_type,
//                     ),
//                     created_at: new Date(),
//                     updated_at: new Date(),
//                 },
//             }),
//         );
//         count--;
//     }
//     return requests;
// };

// export default createRequest;