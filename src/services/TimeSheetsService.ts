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

export interface ProjectTimeSheetDto {
  projectName: string;
  timeSheets: Array<{ userName: string | null; totalSpentTime: number }>;
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

async function getByProject(
  projectId: number,
  from?: Date,
  to?: Date,
): Promise<ProjectTimeSheetDto> {
  const rows = await timeSheetsRepoPrisma.getByProject(projectId, { from, to });

  if (rows.length === 0) {
    return { projectName: '', timeSheets: [] };
  }

  const projectName = rows[0].task.project.name;

  const byUser = new Map<number, { userName: string | null; totalSpentTime: number }>();
  for (const row of rows) {
    const entry = byUser.get(row.userId);
    if (entry) {
      entry.totalSpentTime += row.spent_time ?? 0;
    } else {
      byUser.set(row.userId, { userName: row.user.name, totalSpentTime: row.spent_time ?? 0 });
    }
  }

  return { projectName, timeSheets: Array.from(byUser.values()) };
}

export default {
  getByUser,
  getByProject,
} as const;
