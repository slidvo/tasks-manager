import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { envConfig } from '@src/env.config';

export interface JwtPayload {
  id: number;
  email: string;
}

export const generateJwt = (payload: JwtPayload): string => {
  const secret = envConfig.getJwtSecret();
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const options: SignOptions = {
    expiresIn: (envConfig.getJwtExpire() as ms.StringValue) || '1H',
  };

  return jwt.sign(payload, secret, options);
};
