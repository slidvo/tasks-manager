import { PrismaPg } from '@prisma/adapter-pg';

import { envConfig } from '@src/env.config';
import { ProjectDto } from '@src/models/Project.model';
import { ProjectRepoPrisma } from '@src/repos/ProjectRepoPrisma';

/******************************************************************************
                                 Constants
******************************************************************************/

const projectRepoPrisma = new ProjectRepoPrisma(
  new PrismaPg({ connectionString: envConfig.getDatabaseUrlApi() }),
);

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * Create one project.
 */
async function createProject(project: ProjectDto): Promise<ProjectDto> {
  const createdProject = await projectRepoPrisma.createProject(project);

  return {
    name: createdProject.name,
    description: createdProject.description ?? undefined,
  };
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  createProject,
} as const;
