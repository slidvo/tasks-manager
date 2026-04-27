import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const findUniqueMock = vi.fn()
const updateMock = vi.fn()

vi.mock('@src/generated/prisma/client', () => {
    return {
        PrismaClient: class {
            task = {
                findUnique: findUniqueMock,
                update: updateMock,
            }
        },
        TaskStatus: {
            CREATED: 'CREATED',
            IN_PROGRESS: 'IN_PROGRESS',
            DONE: 'DONE',
        }
    }
})

describe('TasksRepoPrisma.updateStatus', () => {
    beforeEach(() => {
        findUniqueMock.mockReset()
        updateMock.mockReset()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should calculate spent_time in minutes when status is DONE', async () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-04-27T05:30:00.000Z'))

        findUniqueMock.mockResolvedValue({
            id: 1,
            created_at: new Date('2026-04-27T04:00:00.000Z'),
        })

        updateMock.mockResolvedValue({
            id: 1,
            status: 'DONE',
            completed_at: new Date('2026-04-27T05:30:00.000Z'),
            spent_time: 90,
        })

        const { TasksRepoPrisma } = await import('@src/repos/TasksRepoPrisma')
        const { TaskStatus } = await import('@src/generated/prisma/client')
        const repo = new TasksRepoPrisma({} as never)

        await repo.updateStatus(1, TaskStatus.DONE)

        expect(updateMock).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
            data: {
                status: TaskStatus.DONE,
                completed_at: new Date('2026-04-27T05:30:00.000Z'),
                spent_time: 90,
            },
        })
    })
})
