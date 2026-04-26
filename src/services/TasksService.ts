//TODO

import { Req, Res } from "@src/routes/common/express-types";

/**
 * Назначение исполнителя для задачи
 */
async function assign(req: Req, res: Res): Promise<void> {
    const { taskId } = req.params
    const { id: userId } = (req as any).user
    //TODO: Реализовать логику назначения исполнителя для задачи с id = taskId, пользователю с id = userId
}

export default {
    assign
} as const