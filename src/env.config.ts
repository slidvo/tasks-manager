/* eslint-disable no-process-env */

/******************************************************************************
                                Env Config
******************************************************************************/

const getNodeEnv = (): string => process.env.NODE_ENV ?? 'development';

const isProduction = (): boolean => getNodeEnv() === 'production';
const isDevelopment = (): boolean => getNodeEnv() === 'development';
const isTest = (): boolean => getNodeEnv() === 'test';

const getJwtSecret = (): string | undefined => process.env.JWT_SECRET;
const getJwtExpire = (): string | undefined => process.env.JWT_EXPIRE;
const getDatabaseUrlApi = (): string | undefined => process.env.DATABASE_URL_API;

export const envConfig = {
  getNodeEnv,
  isProduction,
  isDevelopment,
  isTest,
  getJwtSecret,
  getJwtExpire,
  getDatabaseUrlApi,
};