import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import AuthRoutes from './AuthRoutes';
import ProjectRoutes from './ProjectRoutes';
import UserRoutes from './UserRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add UserRouter --------------------------------- //

const userRouter = Router();

userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// ----------------------- Add ProjectRouter ------------------------------ //

const projectRouter = Router();

projectRouter.post(Paths.Projects.Create, ProjectRoutes.createProject);
projectRouter.post(Paths.Projects.AddTask, ProjectRoutes.addTask);

// ----------------------- Add AuthRouter --------------------------------- //
const authRouter = Router();

authRouter.post(Paths.Auth.Register, AuthRoutes.register);
//=============================================================================
apiRouter.use(Paths.Projects._, projectRouter);
apiRouter.use(Paths.Users._, userRouter);
apiRouter.use(Paths.Auth._, authRouter);
/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
