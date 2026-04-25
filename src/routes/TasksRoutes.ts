import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';
import { logger } from '@src/logger';

/**
 * Assign task performer
 * @route PUT /api/tasks/:taskId/assign 
 */
async function assign(req: Req, res: Res) {
    //TODO Implemet! Add TasksService 
    const jwt = req.header("Authorization")
    logger.debug(`JWT=${jwt}`)
    res.status(HttpStatusCodes.OK).json({ "jwt": jwt, "taskId": req.params["taskId"] })
}


export default {
    assign
} as const;
