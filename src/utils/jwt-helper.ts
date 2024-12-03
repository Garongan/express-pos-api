import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET!;

interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
    issuer: 'POS-App',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    throw new Error('Invalid jwt token');
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};
