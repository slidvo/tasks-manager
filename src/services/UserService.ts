import { PrismaPg } from '@prisma/adapter-pg';

import { UserMapper } from '@src/mapper/UserMapper';
import { UserDto } from '@src/models/User.model';
import { UserRepoPrisma } from '@src/repos/UserRepoPrisma';
import { envConfig } from '@src/env.config';
import { logger } from '@src/logger';

/******************************************************************************
                                 Constants
******************************************************************************/

const Errors = {
  USER_NOT_FOUND: 'User not found',
} as const;

const userRepoPrisma = new UserRepoPrisma(
  new PrismaPg({ connectionString: envConfig.getDatabaseUrlApi() }),
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
  const updated = await userRepoPrisma.updateOne(user);
  logger.debug(`updated = ${JSON.stringify(updated)}`);
}

/**
 * Delete a user by their id.
 */
async function deleteOne(id: number): Promise<void> {
  //TODO
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
