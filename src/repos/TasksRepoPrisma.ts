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
            where:{
                id: taskId,
            }, 
            data:{
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

    async updateStatus(taskId: number, status: TaskStatus): Promise<Task> {
        const task = await this.findById(taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        return this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                status,
                completed_at: status === TaskStatus.DONE ? new Date() : null,
            },
        });
    }
}
