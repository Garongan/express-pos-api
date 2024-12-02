import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt-helper';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (verifyToken(token) === null) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
  next();
};
