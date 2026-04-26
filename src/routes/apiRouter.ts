import { Router } from 'express';
import Paths from '@src/common/constants/Paths';

import AuthRoutes from './AuthRoutes';
import ProjectRoutes from './ProjectRoutes';
import UserRoutes from './UserRoutes';
import TasksRoutes from './TasksRoutes';
import { authMiddleware } from '@src/utils/middlewares';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add UserRouter --------------------------------- //

const userRouter = Router();

userRouter.get(Paths.Users.Get, authMiddleware, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, authMiddleware, UserRoutes.add);
userRouter.put(Paths.Users.Update, authMiddleware, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, authMiddleware, UserRoutes.delete);

// ----------------------- Add ProjectRouter ------------------------------ //

const projectRouter = Router();

projectRouter.post(Paths.Projects.Create, authMiddleware, ProjectRoutes.createProject);
projectRouter.post(Paths.Projects.AddTask, authMiddleware, ProjectRoutes.addTask);

// ----------------------- Add AuthRouter --------------------------------- //
const authRouter = Router();

authRouter.post(Paths.Auth.Register, AuthRoutes.register);

// ----------------------- Add TasksRouter --------------------------------- //
const tasksRouter = Router()
tasksRouter.put(Paths.Tasks.Assign, authMiddleware, TasksRoutes.assign);

//=============================================================================
apiRouter.use(Paths.Projects._, projectRouter);
apiRouter.use(Paths.Users._, userRouter);
apiRouter.use(Paths.Auth._, authRouter);
apiRouter.use(Paths.Tasks._, tasksRouter)
/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
