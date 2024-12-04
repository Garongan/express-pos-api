import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenPayloadInterface } from '../model/token-payload-interface';

dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET!;

export const generateToken = (payload: TokenPayloadInterface) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
    issuer: 'POS-App',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayloadInterface;
  } catch {
    throw new Error('Invalid jwt token');
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayloadInterface;
};
