import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@src/generated/prisma/client';

export interface TimeSheetFilters {
    projectId?: number;
    from?: Date;
    to?: Date;
}

export interface TimeSheetWithRelations {
    id: number;
    spent_time: number | null;
    date: Date;
    userId: number;
    taskId: number;
    user: { name: string | null };
    task: { name: string };
}

export class TimeSheetsRepoPrisma {
    private prisma: PrismaClient;

    constructor(private adapter: PrismaPg) {
        this.prisma = new PrismaClient({ adapter });
    }

    async getByUser(userId: number, filters: TimeSheetFilters): Promise<TimeSheetWithRelations[]> {
        return this.prisma.timeSheet.findMany({
            where: {
                userId,
                ...(filters.projectId !== undefined && {
                    task: { projectId: filters.projectId },
                }),
                ...((filters.from !== undefined || filters.to !== undefined) && {
                    date: {
                        ...(filters.from && { gte: filters.from }),
                        ...(filters.to && { lte: filters.to }),
                    },
                }),
            },
            include: {
                user: { select: { name: true } },
                task: { select: { name: true } },
            },
            orderBy: { date: 'asc' },
        });
    }
}
