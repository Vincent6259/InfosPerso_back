import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'prisma/prisma.service';
import generateUniqueTag from './tag/generateTag';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, confirmPassword } = createUserDto;

    // find mail
    const existingMail = await this.prisma.user_data.findFirst({
      where: {
        label_id: 3,
        content: email,
      },
    });

    if (existingMail) {
      throw new BadRequestException('Ce mail est déjà utilisé');
    }
    //generate tag
    const tag = await generateUniqueTag(this.prisma);

    if (password !== confirmPassword) {
      throw new BadRequestException('pas le même mot de passe');
    }

    //hash password
    const hashedPassword = await argon2.hash(password);

    //add user in db
    const newUser = await this.prisma.$transaction(async (prisma) => {
      //password
      const user = await prisma.user.create({
        data: { hashRefreshToken: '', password: hashedPassword, tag: tag },
      });

      //email
      await prisma.user_data.create({
        data: {
          content: email,
          user_id: user.id,
          label_id: 3,
          confidentiality: 'MAXIMUM',
        },
      });

      return user;
    });
    const { ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    const userData = await this.prisma.user_data.findFirst({
      where: {
        label_id: 3,
        content: email,
      },
      include: {
        user: true,
      },
    });

    if (!userData || !userData.user) {
      throw new BadRequestException('Utilisateur non trouvé');
    }

    return userData.user;
  }

  //TODO: Update password
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  //TODO: Supression utilisateurs et ses données
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
