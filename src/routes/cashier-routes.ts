import { Router } from 'express';
import {
  getCashierByIdController
} from '../controllers/cashier-controller';
import { authMiddleware } from '../middlewares/middleware';

const cashierRoutes = Router();

cashierRoutes.use(authMiddleware);
cashierRoutes.get('/:id', getCashierByIdController);

export default cashierRoutes;
