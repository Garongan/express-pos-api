import { Router } from 'express';
import {
  activateCashierController,
  deleteCashierController,
  getAllCashierController,
  getCashierByIdController,
  registerCashierController,
  updateCashierController,
} from '../controllers/cashier-controller';
import { adminMiddleware, authMiddleware } from '../middlewares/middleware';

const cashierRoutes = Router();

cashierRoutes.use(authMiddleware);
cashierRoutes.get('/:id', getCashierByIdController);

cashierRoutes.use(adminMiddleware, [
  cashierRoutes.get('/', getAllCashierController),
  cashierRoutes.post('/register', registerCashierController),
  cashierRoutes.delete('/:id', deleteCashierController),
  cashierRoutes.put('/:id', updateCashierController),
  cashierRoutes.put('/:id/activate', activateCashierController),
]);

export default cashierRoutes;
