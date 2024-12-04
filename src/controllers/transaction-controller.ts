import { Request, Response } from 'express';
import { commonResponse, errorResponse } from '../utils/custom-responses';
import { TransactionDetailInterface } from '../model/transaction-detail-interface';
import { createTransactionService } from '../services/transaction-service';

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
