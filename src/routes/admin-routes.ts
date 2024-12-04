import { Router } from 'express';
import { adminMiddleware, authMiddleware } from '../middlewares/middleware';
import {
  activateCashierController,
  deleteCashierController,
  getAllCashierController,
  registerCashierController,
  updateCashierController,
} from '../controllers/cashier-controller';

const adminRoutes = Router();

adminRoutes.use(authMiddleware);
adminRoutes.use(adminMiddleware);

adminRoutes.get('/', getAllCashierController);
adminRoutes.post('/register', registerCashierController);
adminRoutes.delete('/:id', deleteCashierController);
adminRoutes.put('/:id', updateCashierController);
adminRoutes.put('/:id/activate', activateCashierController);

export default adminRoutes;
