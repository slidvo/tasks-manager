import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms'

export interface JwtPayload {
  id: number;
  email: string;
}

export const generateJwt = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRE as ms.StringValue) || '1H',
  };

  return jwt.sign(payload, secret, options);
};
