import { Request, Response } from 'express';
import {
  activateCashierService,
  deleteCashierService,
  getAllCashierService,
  getCashierByIdService,
  registerCashierService,
  updateCashierService,
} from '../services/cashier-service';
import { commonResponse, errorResponse } from '../utils/custom-responses';

export const registerCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerCashierService({ username, password, role });
    commonResponse(res, 201, { user });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getAllCashierController = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    const cashiers = await getAllCashierService(isDeleted?.toString());
    commonResponse(res, 200, { cashiers });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getCashierByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cashier = await getCashierByIdService(id);
    commonResponse(res, 200, { cashier });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCashier = await deleteCashierService(id);
    if (deletedCashier)
      commonResponse(res, 200, { message: 'Cashier has been deleted' });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const data = { id: id, username: username, password: password, role: role };
    const updatedCashier = await updateCashierService(data);
    commonResponse(res, 200, { updatedCashier });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const activateCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const activatedCashier = await activateCashierService(id);
    if (activatedCashier)
      commonResponse(res, 200, { message: 'Cashier has been activated' });
  } catch (error) {
    errorResponse(res, error);
  }
};
