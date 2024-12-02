import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import { getToken } from '../middlewares/middleware';
import { decodeToken } from '../utils/jwt-helper';
import { registerUser } from '../services/admin-service';

export const registerCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = getToken(req, res);
    const decodedToken = decodeToken(token!);

    if (decodedToken.role !== Role.ADMIN) {
      res.status(403).json({ message: 'Forbidden access' });
      return;
    }

    const { username, password, role } = req.body;
    const user = await registerUser({ username, password, role });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};
