import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Project, Task } from '@src/generated/prisma/client';

import { ProjectDto } from '@src/models/Project.model';
import { TaskDto } from '@src/models/Task.model';

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
}
