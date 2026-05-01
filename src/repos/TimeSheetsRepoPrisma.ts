import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, TimeSheet } from '@src/generated/prisma/client';

export interface TimeSheetFilters {
    projectId?: number;
    from?: Date;
    to?: Date;
}

export class TimeSheetsRepoPrisma {
    private prisma: PrismaClient;

    constructor(private adapter: PrismaPg) {
        this.prisma = new PrismaClient({ adapter });
    }

    async getByUser(userId: number, filters: TimeSheetFilters): Promise<TimeSheet[]> {
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
            orderBy: { date: 'asc' },
        });
    }
}
