import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import {
  customResponse,
  internalServerErrorResponse,
} from '../utils/custom-responses';
import { decodeToken, verifyToken } from '../utils/jwt-helper';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const credentials = process.env.BASIC_AUTH;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    customResponse(res, 400, { message: 'No authorization provided' });
    return;
  }

  if (credentials !== authHeader.split(' ')[1]) {
    customResponse(res, 401, { message: 'Invalid authentication' });
    return;
  }

  next();
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req, res);
  try {
    if (token && !verifyToken(token)) {
      customResponse(res, 400, { message: 'Invalid or expired token' });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const getToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    customResponse(res, 400, { message: 'No authorization provided' });
    return;
  }

  return authHeader!.split(' ')[1];
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getToken(req, res);
    const decodedToken = decodeToken(token!);

    if (decodedToken.role !== Role.ADMIN) {
      customResponse(res, 403, { message: 'Forbidden access' });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};
