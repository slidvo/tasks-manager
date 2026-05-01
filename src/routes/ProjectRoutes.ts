import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ProjectModel from '@src/models/Project.model';
import TaskModel from '@src/models/Task.model';
import ProjectService from '@src/services/ProjectService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

/******************************************************************************
                                 Constants
******************************************************************************/

const reqValidators = {
  create: parseReq({ project: ProjectModel.isComplete }),
  addTask: parseReq({
    projectId: transform(Number, isNumber),
    task: TaskModel.isComplete,
  }),
} as const;

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * Create one project.
 *
 * @route POST /api/projects
 */
async function createProject(req: Req, res: Res) {
  const { project } = reqValidators.create(req.body);
  const createdProject = await ProjectService.createProject(project);

  res.status(HttpStatusCodes.CREATED).json({ project: createdProject });
}

/**
 * Add one task to project.
 *
 * @route POST /api/projects/:projectId/tasks
 */
async function addTask(req: Req, res: Res) {
  const { projectId, task } = reqValidators.addTask({
    ...req.body,
    ...req.params,
  });

  const createdTask = await ProjectService.addTask(projectId, task);

  res.status(HttpStatusCodes.CREATED).json({
    task: createdTask,
  });
}

/**
 * Get information about all projects.
 *
 * @route POST /api/projects/info
 */
async function getProjectsInfo(req: Req, res: Res) {
  const { id: userId } = (req as any).user;
  const projectsInfo = await ProjectService.getProjectsInfo(userId);
  res.status(HttpStatusCodes.OK).json({ projects: projectsInfo });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  createProject,
  addTask,
  getProjectsInfo
} as const;
