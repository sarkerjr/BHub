import jwt from 'jsonwebtoken';
import { env } from '../lib/env';

export const generateToken = (userId: number, email: string): string => {
  return jwt.sign(
    { userId, email },
    env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): { userId: number; email: string } => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number; email: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
