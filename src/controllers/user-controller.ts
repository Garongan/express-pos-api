import { Request, Response } from 'express';
import {
  activateUserService,
  deleteUserService,
  getAllUserService,
  getUserByIdService,
  registerUserService,
  updateUserService,
} from '../services/user-service';
import { commonResponse, errorResponse } from '../utils/custom-responses';
import { Role } from '@prisma/client';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerUserService({ username, password, role });
    commonResponse(res, 201, { user });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    const cashiers = await getAllUserService(
      Role.CASHIER,
      isDeleted?.toString(),
    );
    commonResponse(res, 200, { cashiers });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cashier = await getUserByIdService(id, Role.CASHIER);
    commonResponse(res, 200, { cashier });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCashier = await deleteUserService(id, Role.CASHIER);
    if (deletedCashier)
      commonResponse(res, 200, { message: 'Cashier has been deleted' });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const data = { id: id, username: username, password: password, role: role };
    const updatedCashier = await updateUserService(data);
    commonResponse(res, 200, { updatedCashier });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const activateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activatedCashier = await activateUserService(id);
    if (activatedCashier)
      commonResponse(res, 200, { message: 'Cashier has been activated' });
  } catch (error) {
    errorResponse(res, error);
  }
};
