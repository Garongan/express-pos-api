import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt-helper';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req, res);
  try {
    if (token && !verifyToken(token)) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
  next();
};

export const getToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  return authHeader.split(' ')[1];
};
