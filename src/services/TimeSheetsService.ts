import { PrismaPg } from '@prisma/adapter-pg';

import { envConfig } from '@src/env.config';
import { TimeSheetsRepoPrisma } from '@src/repos/TimeSheetsRepoPrisma';

const timeSheetsRepoPrisma = new TimeSheetsRepoPrisma(
  new PrismaPg({ connectionString: envConfig.getDatabaseUrlApi() }),
);

async function getByUser(
  userId: number,
  projectId?: number,
  from?: Date,
  to?: Date,
) {
  return timeSheetsRepoPrisma.getByUser(userId, { projectId, from, to });
}

export default {
  getByUser,
} as const;
