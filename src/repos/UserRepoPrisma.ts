import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, User } from 'generated/prisma/client';
import { UserDto } from '@src/models/User.model';

export class UserRepoPrisma {
  private prisma: PrismaClient;
  constructor(private adapter: PrismaPg) {
    this.prisma = new PrismaClient({ adapter });
  }

  async addOne(user: UserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
      select: {
        email: true,
        name: true,
      },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
