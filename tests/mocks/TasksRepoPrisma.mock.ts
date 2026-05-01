import { Task, TaskStatus } from '@src/generated/prisma/client'

export const updateStatusMock = vi.fn()

export class TasksRepoPrismaMock {
    updateStatus = updateStatusMock
    assign = vi.fn()
}

export function resetTasksRepoPrismaMock() {
    updateStatusMock.mockReset()

    updateStatusMock.mockResolvedValue({
        id: 1,
        uuid: 'task-1',
        name: 'testTask1',
        description: 'taskDescr1',
        deadline: new Date('2026-05-01T10:00:00.000Z'),
        projectId: 1,
        userId: 1,
        status: TaskStatus.DONE,
        created_at: new Date('2026-04-01T10:00:00.000Z'),
        completed_at: new Date('2026-04-27T04:00:00.000Z'),
        spent_time: 120,
    } as Task)
}
