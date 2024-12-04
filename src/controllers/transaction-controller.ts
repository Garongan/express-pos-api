import { Request, Response } from 'express';
import { commonResponse, errorResponse } from '../utils/custom-responses';
import { TransactionDetailInterface } from '../model/transaction-detail-interface';
import {
  createTransactionService,
  getAllTransactionService,
  getTransactionByIdService,
} from '../services/transaction-service';
import { getToken } from '../middlewares/middleware';

export const createTransactionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, paymentType } = req.body;
    const transactionDetails: TransactionDetailInterface[] =
      req.body.transactionDetails;
    const transaction = await createTransactionService({
      userId,
      paymentType,
      transactionDetails,
    });
    commonResponse(res, 201, { transaction });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getTransactionByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = getToken(req, res);
    if (!token) return;

    const { id } = req.params;
    const transaction = await getTransactionByIdService(id, token);
    commonResponse(res, 200, { transaction });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getAllTransactionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = getToken(req, res);
    if (!token) return;

    const { paymentType } = req.query;
    const transactions = await getAllTransactionService(
      paymentType?.toString(),
      token,
    );
    commonResponse(res, 200, { transactions });
  } catch (error) {
    errorResponse(res, error);
  }
};
