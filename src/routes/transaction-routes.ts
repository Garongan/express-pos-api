import { Router } from 'express';
import { authMiddleware } from '../middlewares/middleware';
import { createTransactionController } from '../controllers/transaction-controller';

const transactionRoutes = Router();

transactionRoutes.use(authMiddleware);

transactionRoutes.post('/', createTransactionController);

export default transactionRoutes;
