import { Project, Task } from '@src/generated/prisma/client'
export const createProjectMock = vi.fn()
export const addTaskMock = vi.fn()
export const getProjectsInfoMock = vi.fn()

export class ProjectRepoPrismaMock {
    createProject = createProjectMock
    addTask = addTaskMock
    getProjectsInfo = getProjectsInfoMock
}

export function resetProjectRepoPrismaMock() {
    createProjectMock.mockReset()
    addTaskMock.mockReset()
    getProjectsInfoMock.mockReset()

    createProjectMock.mockResolvedValue({
        id: 1,
        uuid: "a1",
        name: "testName1",
        description: "descr1"
    } as Project)

    addTaskMock.mockResolvedValue({
        id: 1,
        uuid: "t1",
        name: "testTask1",
        description: "taskDescr1",
        deadline: new Date('2026-05-01T10:00:00.000Z'),
        projectId: 1,
    } as Task)

    getProjectsInfoMock.mockResolvedValue([
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
    ])

}
