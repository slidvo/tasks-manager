import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import TimeSheetsService from '@src/services/TimeSheetsService';

import { Req, Res } from './common/express-types';

/**
 * Get time sheets for a single developer with optional filters.
 *
 * @route GET /api/timesheets/:userId
 * @query projectId? - filter by project
 * @query from?      - start date (ISO string)
 * @query to?        - end date (ISO string)
 */
async function getByUser(req: Req, res: Res) {
  const userId = Number(req.params.userId);
  const projectId = req.query.projectId ? Number(req.query.projectId) : undefined;
  const from = req.query.from ? new Date(req.query.from as string) : undefined;
  const to = req.query.to ? new Date(req.query.to as string) : undefined;

  const timeSheets = await TimeSheetsService.getByUser(userId, projectId, from, to);

  res.status(HttpStatusCodes.OK).json({ timeSheets });
}

export default {
  getByUser,
} as const;
