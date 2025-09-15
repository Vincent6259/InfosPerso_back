import { PrismaClient } from '@prisma/client';
import createUser from './dataCreation/user';
import seedValues from './seedValues';
import createFriendship from './dataCreation/friendship';
import createNotification from './dataCreation/notification';
import createGroup from './dataCreation/group';
import createDataLabel from './dataCreation/dataLabel';
import createGroupMember from './dataCreation/groupMember';
import createGroupePermission from './dataCreation/groupPermission';
import createPermission from './dataCreation/permission';
import createConversations from './dataCreation/conversation';
import createMessages from './dataCreation/messages';
import createUserData from './dataCreation/userData';

export const prisma = new PrismaClient();

async function main() {
  const dataLabels = await createDataLabel();
  const users = await createUser(seedValues.usersAmount);
  const userDatas = await createUserData(users, dataLabels);
  const friendships = await createFriendship(seedValues.friendshipsAmount, users);
  const groups = await createGroup(seedValues.groupsAmount, users);
  const conversations = await createConversations(groups, friendships)
  const notifications = await createNotification(seedValues.notificationsAmount, users);
  // const requests = await createRequest(seedValues.requestsAmount, friendships);
  const groupMembers = await createGroupMember(seedValues.groupMembersAmount, groups, users);
  const messages = await createMessages(seedValues.messagesAmount, conversations, groupMembers, friendships)
  const permissions = await createPermission(friendships, userDatas);
  const createGroupePermissions = await createGroupePermission(groups, dataLabels);

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
