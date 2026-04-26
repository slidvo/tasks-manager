import jetPaths from 'jet-paths';

const Paths = {
  _: '/api',
  Auth: {
    _: '/auth',
    Register: '/register',
    Login: '/login',
  },
  Projects: {
    _: '/projects',
    Create: '/',
    AddTask: '/:projectId/tasks',
  },
  Users: {
    _: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Tasks: {
    _: '/tasks',
    Assign: '/:taskId/assign'
  }
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
