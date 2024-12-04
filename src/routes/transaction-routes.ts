import { Router } from 'express';
import { authMiddleware, cashierMiddleware } from '../middlewares/middleware';
import {
  createTransactionController,
  getAllTransactionController,
  getTransactionByIdController,
} from '../controllers/transaction-controller';

const transactionRoutes = Router();

// auth middleware
transactionRoutes.use(authMiddleware);

transactionRoutes.get('/:id', getTransactionByIdController);
transactionRoutes.get('/', getAllTransactionController);

// auth and cashier middleware
transactionRoutes.post('/', cashierMiddleware, createTransactionController);

export default transactionRoutes;
