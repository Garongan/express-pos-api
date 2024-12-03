import { Request, Response } from 'express';
import {
  deleteCahiserService,
  getAllCashierService,
  getCashierService,
  registerCashierService,
  updateCashierService,
} from '../services/admin-service';
import {
  customResponse,
  internalServerErrorResponse,
} from '../utils/custom-responses';

export const registerCashierController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerCashierService({ username, password, role });
    customResponse(res, 201, { user });
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const getAllCashierController = async (req: Request, res: Response) => {
  try {
    const cashiers = await getAllCashierService();
    customResponse(res, 200, { cashiers });
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const getCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cashier = await getCashierService(id);
    customResponse(res, 200, { cashier });
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};

export const deleteCashierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCashier = await deleteCahiserService(id);
    customResponse(res, 200, { deletedCashier });
  } catch (error) {
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
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
    if (error instanceof Error) {
      customResponse(res, 400, { message: error.message });
    } else {
      internalServerErrorResponse(res);
    }
  }
};
