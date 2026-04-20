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

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  createProject,
  addTask,
} as const;
