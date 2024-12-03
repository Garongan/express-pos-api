import { Response } from 'express';

export const commonResponse = (
  res: Response,
  statusCode: number,
  message: object,
) => {
  res.status(statusCode).json({ statusCode: 200, data: message });
};

export const internalServerErrorResponse = (res: Response) => {
  res.status(500).json({
    statusCode: 500,
    data: { message: 'An unknown error occurred' },
  });
};

export const errorResponse = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('not found')) {
      commonResponse(res, 404, { message: 'Not found' });
    } else {
      commonResponse(res, 400, { message: error.message });
    }
  } else {
    internalServerErrorResponse(res);
  }
};
