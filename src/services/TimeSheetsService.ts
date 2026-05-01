import { PrismaPg } from '@prisma/adapter-pg';

import { envConfig } from '@src/env.config';
import { TimeSheetsRepoPrisma } from '@src/repos/TimeSheetsRepoPrisma';

export interface TimeSheetDto {
  id: number;
  spent_time: number | null;
  date: Date;
  userName: string | null;
  taskName: string;
}

const timeSheetsRepoPrisma = new TimeSheetsRepoPrisma(
  new PrismaPg({ connectionString: envConfig.getDatabaseUrlApi() }),
);

async function getByUser(
  userId: number,
  projectId?: number,
  from?: Date,
  to?: Date,
): Promise<TimeSheetDto[]> {
  const rows = await timeSheetsRepoPrisma.getByUser(userId, { projectId, from, to });
  return rows.map((row) => ({
    id: row.id,
    spent_time: row.spent_time,
    date: row.date,
    userName: row.user.name,
    taskName: row.task.name,
  }));
}

export default {
  getByUser,
} as const;
