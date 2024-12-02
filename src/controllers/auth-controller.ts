import { Request, Response } from 'express';
import { loginUser } from '../services/auth-service';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};
