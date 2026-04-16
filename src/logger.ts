import pino from 'pino';
import { envConfig } from './env.config';

export const logger = pino({
  name: 'tasks-manager',
  level: envConfig.isProduction() ? 'info' : 'debug',
});