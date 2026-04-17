import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ProjectModel from '@src/models/Project.model';
import ProjectService from '@src/services/ProjectService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

/******************************************************************************
                                 Constants
******************************************************************************/

const reqValidators = {
  create: parseReq({ project: ProjectModel.isComplete }),
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

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  createProject,
} as const;
