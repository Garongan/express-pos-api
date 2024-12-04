import { Router } from 'express';
import { getUserByIdController } from '../controllers/user-controller';
import { authMiddleware } from '../middlewares/middleware';

const cashierRoutes = Router();

cashierRoutes.use(authMiddleware);
cashierRoutes.get('/:id', getUserByIdController);

export default cashierRoutes;
