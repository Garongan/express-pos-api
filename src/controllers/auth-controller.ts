import { Request, Response } from 'express';
import { loginUser } from '../services/auth-service';
import {
  customResponse,
  internalServerErrorResponse,
} from '../utils/custom-responses';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    customResponse(res, 200, { token });
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};
