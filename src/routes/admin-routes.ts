import { Router } from 'express';
import {
  getAllCashier,
  registerCashierController,
} from '../controllers/admin-controller';
import { adminMiddleware, authMiddleware } from '../middlewares/middleware';

const adminRoutes = Router();

adminRoutes.use(authMiddleware);
adminRoutes.use(adminMiddleware);

adminRoutes.post('/cashiers/register', registerCashierController);

adminRoutes.get('cashiers', getAllCashier);

export default adminRoutes;
