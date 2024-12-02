import { Router } from 'express';
import { authMiddleware } from '../middlewares/middleware';
import { registerCashierController } from '../controllers/admin-controller';

const adminRoutes = Router();

adminRoutes.post(
  '/register-cashier',
  authMiddleware,
  registerCashierController,
);

export default adminRoutes;
