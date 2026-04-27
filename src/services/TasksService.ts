import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "@src/env.config";
import { TaskStatus } from "@src/generated/prisma/client";
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

/**
 * Обновление статуса задачи
 */
async function updateStatus(taskId: number, userId: number, status: TaskStatus) {
    const updatedTask = await tasksRepoPrisma.updateStatus(taskId, userId, status);

    return {
        id: updatedTask.id,
        status: updatedTask.status,
        completed_at: updatedTask.completed_at ?? undefined,
    };
}

export default {
    assign,
    updateStatus
} as const
