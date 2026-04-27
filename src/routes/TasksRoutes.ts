import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { TaskStatus } from '@src/generated/prisma/client';
import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';
import { logger } from '@src/logger';
import TasksService from '@src/services/TasksService';

const reqValidators = {
    updateStatus: parseReq({
        taskId: transform(Number, isNumber),
        status: (val: TaskStatus) => val in TaskStatus,
    }),
} as const

/**
 * Assign task performer
 * @route PUT /api/tasks/:taskId/assign 
 */
async function assign(req: Req, res: Res) {
    // reqValidators.assign(req.params)
    await TasksService.assign(req, res);
    res.status(HttpStatusCodes.OK).end()
}
/**
 * Update task status
 * @route PATCH /api/tasks/:taskId/status
 * @param req 
 * @param res 
 */
async function updateStatus(req: Req, res: Res) {

    const { taskId, status } = reqValidators.updateStatus({
        ...req.params,
        ...req.body,
    });

    const { id: userId } = (req as any).user;

    const updatedTask = await TasksService.updateStatus(taskId, userId, <TaskStatus>status);

    res.status(HttpStatusCodes.OK).json({ task: updatedTask });
}

export default {
    assign,
    updateStatus
} as const;

