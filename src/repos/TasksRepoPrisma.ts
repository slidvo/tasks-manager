import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Task, TaskStatus } from '@src/generated/prisma/client';

export class TasksRepoPrisma {
    private prisma: PrismaClient;
    constructor(private adapter: PrismaPg) {
        this.prisma = new PrismaClient({ adapter });
    }

    async assign(taskId: number, userId: number): Promise<void> {
        const task = this.findById(taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        await this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                userId: userId,
            }
        })
    }

    async findById(id: number): Promise<Task> {
        return this.prisma.task.findUnique({
            where: {
                id: id,
            },
        }) as Promise<Task>;
    }

    async updateStatus(taskId: number, userId: number, status: TaskStatus): Promise<Task> {
        const task = await this.findById(taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        const completedAt = status === TaskStatus.DONE ? new Date() : null;
        const spentTime = status === TaskStatus.DONE && task.created_at
            ? Math.floor((Date.now() - task.created_at.getTime()) / 1000 / 60)
            : null;

        const result = await this.prisma.task.updateMany({
            where: {
                id: taskId,
                userId: userId,
            },
            data: {
                status,
                completed_at: completedAt,
                spent_time: spentTime,
            },
        });

        if (result.count === 0) {
            throw new Error(`User with id ${userId} cannot update task with id ${taskId}`);
        }

        return this.findById(taskId);
    }
}
