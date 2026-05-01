export const getByUserMock = vi.fn();
export const getByProjectMock = vi.fn();

export class TimeSheetsRepoPrismaMock {
    getByUser = getByUserMock;
    getByProject = getByProjectMock;
}

const mockTimeSheets = [
    {
        id: 1,
        spent_time: 120,
        date: new Date('2026-04-10T00:00:00.000Z'),
        userId: 12345,
        taskId: 1,
        user: { name: 'Женя Потапов' },
        task: { name: 'Task 1' },
    },
    {
        id: 2,
        spent_time: 60,
        date: new Date('2026-04-15T00:00:00.000Z'),
        userId: 12345,
        taskId: 2,
        user: { name: 'Женя Потапов' },
        task: { name: 'Task 2' },
    },
];

const mockProjectTimeSheets = [
    {
        id: 1,
        spent_time: 120,
        date: new Date('2026-04-10T00:00:00.000Z'),
        userId: 1,
        user: { name: 'Женя Потапов' },
        task: { project: { name: 'Test Project' } },
    },
    {
        id: 2,
        spent_time: 60,
        date: new Date('2026-04-15T00:00:00.000Z'),
        userId: 2,
        user: { name: 'Другой разраб' },
        task: { project: { name: 'Test Project' } },
    },
    {
        id: 3,
        spent_time: 90,
        date: new Date('2026-04-20T00:00:00.000Z'),
        userId: 1,
        user: { name: 'Женя Потапов' },
        task: { project: { name: 'Test Project' } },
    },
];

export function resetTimeSheetsRepoPrismaMock() {
    getByUserMock.mockReset();
    getByUserMock.mockResolvedValue(mockTimeSheets);

    getByProjectMock.mockReset();
    getByProjectMock.mockResolvedValue(mockProjectTimeSheets);
}
