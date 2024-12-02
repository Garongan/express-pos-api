import { Router } from 'express';
import { authMiddleware } from '../middlewares/middleware';

const cashierRoutes = Router();

cashierRoutes.use(authMiddleware);

export default cashierRoutes;
