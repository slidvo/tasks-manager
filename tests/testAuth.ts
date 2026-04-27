import jwt from 'jsonwebtoken';

export const testAuthPayload = {
  id: 12345,
  username: 'john_doe',
  role: 'admin',
} as const;

export function makeTestToken(jwtSecret: string): string {
  return jwt.sign(testAuthPayload, jwtSecret);
}

