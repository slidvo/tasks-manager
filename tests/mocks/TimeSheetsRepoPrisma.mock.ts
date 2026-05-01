import { TimeSheet } from '@src/generated/prisma/client';

export const getByUserMock = vi.fn();

export class TimeSheetsRepoPrismaMock {
    getByUser = getByUserMock;
}

const mockTimeSheets: TimeSheet[] = [
    {
        id: 1,
        spent_time: 120,
        date: new Date('2026-04-10T00:00:00.000Z'),
        userId: 12345,
        taskId: 1,
    },
    {
        id: 2,
        spent_time: 60,
        date: new Date('2026-04-15T00:00:00.000Z'),
        userId: 12345,
        taskId: 2,
    },
];

export function resetTimeSheetsRepoPrismaMock() {
    getByUserMock.mockReset();
    getByUserMock.mockResolvedValue(mockTimeSheets);
}
