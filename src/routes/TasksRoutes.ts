import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';
import { logger } from '@src/logger';
import TasksService from '@src/services/TasksService';

// const reqValidators = {
//     assign: parseReq({
//         taskId: transform(Number, isNumber),
//     })
// } as const

/**
 * Assign task performer
 * @route PUT /api/tasks/:taskId/assign 
 */
async function assign(req: Req, res: Res) {
    // reqValidators.assign(req.params)
    await TasksService.assign(req, res);
    res.status(HttpStatusCodes.OK).end()
}


export default {
    assign
} as const;
