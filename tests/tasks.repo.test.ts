import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
    findUniqueMock,
    PrismaClientMock,
    resetPrismaClientMock,
    updateManyMock,
} from './mocks/PrismaClient.mock'

vi.mock('@src/generated/prisma/client', () => {
    return {
        PrismaClient: PrismaClientMock,
        TaskStatus: {
            CREATED: 'CREATED',
            IN_PROGRESS: 'IN_PROGRESS',
            DONE: 'DONE',
        }
    }
})

describe('TasksRepoPrisma.updateStatus', () => {
    beforeEach(() => {
        resetPrismaClientMock()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should calculate spent_time in minutes when status is DONE', async () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-04-27T05:30:00.000Z'))

        const { TasksRepoPrisma } = await import('@src/repos/TasksRepoPrisma')
        const { TaskStatus } = await import('@src/generated/prisma/client')
        const repo = new TasksRepoPrisma({} as never)

        updateManyMock.mockResolvedValue({
            count: 1,
        })

        findUniqueMock
            .mockResolvedValueOnce({
                id: 1,
                userId: 1,
                created_at: new Date('2026-04-27T04:00:00.000Z'),
            })
            .mockResolvedValueOnce({
                id: 1,
                userId: 1,
                status: 'DONE',
                completed_at: new Date('2026-04-27T05:30:00.000Z'),
                spent_time: 90,
            })
        
        await repo.updateStatus(1, 1, TaskStatus.DONE)

        expect(updateManyMock).toHaveBeenCalledWith({
            where: {
                id: 1,
                userId: 1,
            },
            data: {
                status: TaskStatus.DONE,
                completed_at: new Date('2026-04-27T05:30:00.000Z'),
                spent_time: 90,
            },
        })
    })

    it('should throw error when user is not task performer', async () => {
        const { TasksRepoPrisma } = await import('@src/repos/TasksRepoPrisma')
        const { TaskStatus } = await import('@src/generated/prisma/client')
        const repo = new TasksRepoPrisma({} as never)

        findUniqueMock.mockResolvedValueOnce({
            id: 1,
            userId: 2,
            created_at: new Date('2026-04-27T04:00:00.000Z'),
        })

        updateManyMock.mockResolvedValue({
            count: 0,
        })

        await expect(repo.updateStatus(1, 1, TaskStatus.DONE)).rejects.toThrow(
            'User with id 1 cannot update task with id 1',
        )
    })
})
