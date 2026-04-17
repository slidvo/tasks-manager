import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Project } from '@src/generated/prisma/client';

import { ProjectDto } from '@src/models/Project.model';

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
}
