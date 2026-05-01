import { ProjectRepoPrismaMock, resetProjectRepoPrismaMock } from './mocks/ProjectRepoPrisma.mock'
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import app from "@src/server"
import { addTaskMock, createProjectMock, getProjectsInfoMock } from './mocks/ProjectRepoPrisma.mock'
import { envConfig } from '@src/env.config'
import { makeTestToken } from './testAuth'

const token = makeTestToken(envConfig.getJwtSecret()!)

vi.mock('@src/repos/ProjectRepoPrisma', () => {
    return {
        ProjectRepoPrisma: ProjectRepoPrismaMock
    }
})

beforeEach(() => {
    resetProjectRepoPrismaMock()
})

describe('POST /api/projects/', () => {
    it('should create project and return http status 201', async () => {
        const res = await request(app)
            .post('/api/projects/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                project: {
                    name: 'Project Alpha',
                    description: 'Alpha description'
                }
            })

        expect(res.status).toBe(201)
        expect(createProjectMock).toHaveBeenCalledWith({
            name: 'Project Alpha',
            description: 'Alpha description'
        })
        expect(res.body).toEqual({
            project: {
                name: 'testName1',
                description: 'descr1'
            }
        })
    })
})

describe('POST /api/projects/:projectId/tasks', () => {
    it('should add task to project and return http status 201', async () => {
        const deadline = '2026-05-01T10:00:00.000Z'

        const res = await request(app)
            .post('/api/projects/1/tasks')
            .set("Authorization", `Bearer ${token}`)
            .send({
                task: {
                    name: 'Task Alpha',
                    description: 'Task description',
                    deadline,
                }
            })

        expect(res.status).toBe(201)
        expect(addTaskMock).toHaveBeenCalledWith(1, {
            name: 'Task Alpha',
            description: 'Task description',
            deadline: new Date(deadline),
        })
        expect(res.body).toEqual({
            task: {
                name: 'testTask1',
                description: 'taskDescr1',
                deadline,
            }
        })
    })
})

describe('POST /api/projects/info', () => {
    it('should return projects info and status 200', async () => {
        const res = await request(app)
            .get('/api/projects/info')
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(getProjectsInfoMock).toHaveBeenCalledWith(12345)
        expect(res.body).toEqual({
            projects: [
                {
                    id: 1,
                    name: 'Project Alpha',
                    description: 'Alpha description',
                    tasks: [
                        {
                            status: 'IN_PROGRESS',
                            performer: {
                                name: 'John',
                                email: 'john@example.com',
                            },
                        },
                    ],
                },
            ],
        })
    })
})
