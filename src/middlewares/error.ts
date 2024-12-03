import { NextFunction, Request, Response } from 'express';
import { internalServerErrorResponse } from '../utils/custom-responses';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  internalServerErrorResponse(res);
  next();
};
