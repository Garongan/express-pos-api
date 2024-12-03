import { Request, Response } from 'express';
import { loginService } from '../services/auth-service';
import { customErrorResponse, customResponse } from '../utils/custom-responses';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginService(username, password);
    customResponse(res, 200, { token });
  } catch (error) {
    customErrorResponse(res, error);
  }
};
