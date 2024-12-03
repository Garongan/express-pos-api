import { Request, Response } from 'express';
import { getAllUser } from '../repositories/user-repository';
import { registerUser } from '../services/admin-service';
import { internalServerErrorResponse } from '../utils/custom-responses';

export const registerCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerUser({ username, password, role });
    res.status(201).json({ data: user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const getAllCashier = async (req: Request, res: Response) => {
  try {
    const cashiers = await getAllUser();
    res.status(200).json({ data: cashiers });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};
