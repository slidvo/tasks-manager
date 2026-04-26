import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "@src/env.config";
import { TasksRepoPrisma } from "@src/repos/TasksRepoPrisma";
import { Req, Res } from "@src/routes/common/express-types";


const tasksRepoPrisma = new TasksRepoPrisma(
    new PrismaPg({ connectionString: envConfig.getDatabaseUrlApi() }),
);

/**
 * Назначение исполнителя для задачи
 */
async function assign(req: Req, res: Res): Promise<void> {
    const { taskId } = req.params
    const { id: userId } = (req as any).user
    await tasksRepoPrisma.assign(Number(taskId), userId)
    //TODO: Реализовать логику назначения исполнителя для задачи с id = taskId, пользователю с id = userId
}

export default {
    assign
} as const