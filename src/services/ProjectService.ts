import { PrismaPg } from '@prisma/adapter-pg';

import { envConfig } from '@src/env.config';
import { ProjectDto } from '@src/models/Project.model';
import { TaskDto } from '@src/models/Task.model';
import { ProjectRepoPrisma } from '@src/repos/ProjectRepoPrisma';
import { ProjectsInfoResponse } from '@src/utils/types';

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

/**
 * Add one task to project.
 */
async function addTask(projectId: number, task: TaskDto): Promise<TaskDto> {
  const createdTask = await projectRepoPrisma.addTask(projectId, task);

  return {
    name: createdTask.name,
    description: createdTask.description ?? undefined,
    deadline: createdTask.deadline,
  };
}

async function getProjectsInfo(userId: number): Promise<ProjectsInfoResponse> {
  const projectsInfo = await projectRepoPrisma.getProjectsInfo(userId);
  return projectsInfo;
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  createProject,
  addTask,
  getProjectsInfo
} as const;
