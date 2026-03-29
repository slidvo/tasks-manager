import { User } from 'generated/prisma/client';

import { UserDto } from '@src/models/User.model';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      name: user.name,
      email: user.email,
    } as UserDto;
  }

  static toDtos(users: User[]): UserDto[] {
    return users.map(UserMapper.toDto);
  }
}
