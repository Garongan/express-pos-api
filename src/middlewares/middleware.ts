import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import {
  commonResponse,
  errorResponse,
  internalServerErrorResponse,
} from '../utils/custom-responses';
import { decodeToken, verifyToken } from '../utils/jwt-helper';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const credentials = process.env.BASIC_AUTH;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    commonResponse(res, 400, { message: 'No authorization provided' });
    return;
  }

  if (credentials !== authHeader.split(' ')[1]) {
    commonResponse(res, 401, { message: 'Invalid authentication' });
    return;
  }

  next();
};

export const getToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    commonResponse(res, 400, { message: 'No authorization provided' });
    return;
  }

  return authHeader!.split(' ')[1];
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req, res);
  if (!token) return;

  try {
    if (!verifyToken(token)) {
      commonResponse(res, 400, { message: 'Invalid or expired token' });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error);
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req, res);
  if (!token) return;

  try {
    const decodedToken = decodeToken(token);

    if (decodedToken.role !== Role.ADMIN) {
      commonResponse(res, 403, { message: 'Forbidden access' });
      return;
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error);
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const cashierMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req, res);
  if (!token) return;
  try {
    const decodedToken = decodeToken(token);

    if (decodedToken.role !== Role.CASHIER) {
      commonResponse(res, 403, { message: 'Forbidden access' });
      return;
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error);
    } else {
      internalServerErrorResponse(res);
    }
  }
};
