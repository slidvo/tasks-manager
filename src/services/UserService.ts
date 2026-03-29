import { PrismaPg } from '@prisma/adapter-pg';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { UserMapper } from '@src/mapper/UserMapper';
import { UserDto } from '@src/models/User.model';
import UserRepo from '@src/repos/UserRepo';
import { UserRepoPrisma } from '@src/repos/UserRepoPrisma';

/******************************************************************************
                                Constants
******************************************************************************/

const Errors = {
  USER_NOT_FOUND: 'User not found',
} as const;

const userRepoPrisma = new UserRepoPrisma(
  new PrismaPg({ connectionString: process.env.DATABASE_URL_API }),
);
/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
async function getAll(): Promise<UserDto[]> {
  const users = await userRepoPrisma.getAll();
  return UserMapper.toDtos(users);
}

/**
 * Add one user.
 */
function addOne(user: UserDto): Promise<void> {
  return userRepoPrisma.addOne(user);
}

/**
 * Update one user.
 */
async function updateOne(user: UserDto): Promise<void> {
  // const persists = await UserRepo.persists(user.id);
  // if (!persists) {
  //   throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
  // }
  // return UserRepo.update(user);
  //TODO
}

/**
 * Delete a user by their id.
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
  }
  return UserRepo.delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  Errors,
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
