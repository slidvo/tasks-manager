import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaClient } from 'generated/prisma/client';

import { UserDto } from '@src/models/User.model';

export class UserRepoPrisma {
  private prisma: PrismaClient;
  constructor(private adapter: PrismaPg) {
    this.prisma = new PrismaClient({ adapter });
  }

  async addOne(user: UserDto): Promise<void> {
    try {
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
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // 1. Пробуем стандартный путь (для некоторых БД)
        let fields = error.meta?.target;

        // 2. Если не нашли, пробуем путь для PostgreSQL / Driver Adapter
        if (!fields && error.meta?.driverAdapterError) {
          fields = (error.meta.driverAdapterError as any)?.cause?.constraint
            ?.fields;
        }

        // 3. Формируем понятное имя поля
        let fieldName = 'данным'; // Значение по умолчанию
        if (Array.isArray(fields) && fields.length > 0) {
          fieldName = fields[0]; // Обычно там одно поле, например "email"
        }

        throw new Error(`Пользователь с таким ${fieldName} уже существует`);
      }
      throw new Error('Ошибка создания пользователя');
    }
  }
}
