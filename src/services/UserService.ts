import { PrismaPg } from '@prisma/adapter-pg';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { IUser } from '@src/models/User.model';
import UserRepo from '@src/repos/UserRepo';

import { Post, PrismaClient } from '../../generated/prisma/client';

/******************************************************************************
                                Constants
******************************************************************************/

const Errors = {
  USER_NOT_FOUND: 'User not found',
} as const;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_API});
const prisma = new PrismaClient({ adapter });
/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
async function addOne(user: IUser): Promise<void> {
  //TODO remove  UserRepo.add(user);
  await prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
  }
  return UserRepo.update(user);
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
