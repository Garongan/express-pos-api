import { Request, Response } from 'express';
import {
  activateCashierService,
  deleteCahiserService,
  getAllCashierService,
  getCashierService,
  registerCashierService,
  updateCashierService,
} from '../services/admin-service';
import { customErrorResponse, customResponse } from '../utils/custom-responses';

export const registerCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerCashierService({ username, password, role });
    customResponse(res, 201, { user });
  } catch (error) {
    customErrorResponse(res, error);
  }
};

export const getAllCashierController = async (req: Request, res: Response) => {
  const { isDeleted } = req.query;
  try {
    const cashiers = await getAllCashierService(isDeleted?.toString());
    customResponse(res, 200, { cashiers });
  } catch (error) {
    customErrorResponse(res, error);
  }
};

export const getCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cashier = await getCashierService(id);
    customResponse(res, 200, { cashier });
  } catch (error) {
    customErrorResponse(res, error);
  }
};

export const deleteCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCashier = await deleteCahiserService(id);
    customResponse(res, 200, { deletedCashier });
  } catch (error) {
    customErrorResponse(res, error);
  }
};

export const updateCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const data = { id: id, username: username, password: password, role: role };
    const updatedCashier = await updateCashierService(data);
    customResponse(res, 200, { updatedCashier });
  } catch (error) {
    customErrorResponse(res, error);
  }
};

export const activateCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const activatedCashier = await activateCashierService(id);
    customResponse(res, 200, { activatedCashier });
  } catch (error) {
    customErrorResponse(res, error);
  }
};
