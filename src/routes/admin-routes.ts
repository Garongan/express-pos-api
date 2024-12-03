import { Router } from 'express';
import {
  activateCashierController,
  deleteCashierController,
  getAllCashierController,
  getCashierController,
  registerCashierController,
  updateCashierController,
} from '../controllers/admin-controller';
import { adminMiddleware, authMiddleware } from '../middlewares/middleware';

const adminRoutes = Router();

adminRoutes.use(authMiddleware);
adminRoutes.use(adminMiddleware);

adminRoutes.post('/cashiers/register', registerCashierController);
adminRoutes.get('/cashiers', getAllCashierController);
adminRoutes.get('/cashiers/:id', getCashierController);
adminRoutes.delete('/cashiers/:id', deleteCashierController);
adminRoutes.put('/cashiers/:id', updateCashierController);
adminRoutes.put('/cashiers/:id/activate', activateCashierController);

export default adminRoutes;
