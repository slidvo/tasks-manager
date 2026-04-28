import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient, Project, Task } from '@src/generated/prisma/client';
import { ProjectDto } from '@src/models/Project.model';
import { TaskDto } from '@src/models/Task.model';
import { UserDto } from '@src/models/User.model';
import { ProjectsInfoResponse } from '@src/utils/types';

export class ProjectRepoPrisma {
  private prisma: PrismaClient;

  constructor(private adapter: PrismaPg) {
    this.prisma = new PrismaClient({ adapter });
  }

  async createProject(project: ProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
      },
    });
  }

  async addTask(projectId: number, task: TaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        deadline: task.deadline,
        projectId,
      },
    });
  }

  async getProjectsInfo(userId: number): Promise<ProjectsInfoResponse> {
    const projectsInfo = await this.prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        tasks: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    });

    return projectsInfo.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description ?? undefined,
      tasks: project.tasks.map((task) => ({
        status: task.status,
        performer: task.user
          ? ({
              name: task.user.name,
              email: task.user.email,
            } as UserDto)
          : null,
      })),
    })) as ProjectsInfoResponse;
  }
}
