import { resetTasksRepoPrismaMock, TasksRepoPrismaMock, updateStatusMock } from './mocks/TasksRepoPrisma.mock'
import { TaskStatus } from '@src/generated/prisma/client'
import { envConfig } from '@src/env.config'
import app from '@src/server'
import request from 'supertest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeTestToken } from './testAuth'

const token = makeTestToken(envConfig.getJwtSecret()!)

vi.mock('@src/repos/TasksRepoPrisma', () => {
    return {
        TasksRepoPrisma: TasksRepoPrismaMock
    }
})

beforeEach(() => {
    resetTasksRepoPrismaMock()
})

describe('PATCH /api/tasks/:taskId/status', () => {
    it('should update task status and return http status 200', async () => {
        const res = await request(app)
            .patch('/api/tasks/1/status')
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: TaskStatus.DONE,
            })

        expect(res.status).toBe(200)
        expect(updateStatusMock).toHaveBeenCalledWith(1, TaskStatus.DONE)
        expect(res.body).toEqual({
            task: {
                id: 1,
                status: TaskStatus.DONE,
                completed_at: '2026-04-27T04:00:00.000Z',
            }
        })
    })
})
