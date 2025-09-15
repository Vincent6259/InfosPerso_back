import { nanoid } from 'nanoid';
import { PrismaService } from 'prisma/prisma.service';

export default async function generateUniqueTag(
  prisma: PrismaService,
): Promise<string> {
  let tag: string = '';
  let exists = true;
  const maxtries = 100;
  let tries = 0;

  while (exists && tries < maxtries) {
    tag = nanoid(5);

    const existingUser = await prisma.user.findUnique({
      where: { tag },
    });
    exists = !!existingUser;
    tries++;
  }
  return tag;
}
