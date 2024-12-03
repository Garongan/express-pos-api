import { Request, Response } from 'express';
import { loginService } from '../services/auth-service';
import {
  customResponse,
  internalServerErrorResponse,
} from '../utils/custom-responses';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginService(username, password);
    customResponse(res, 200, { token });
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};
