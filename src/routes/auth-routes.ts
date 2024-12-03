import { Router } from 'express';
import { loginController } from '../controllers/auth-controller';
import { basicAuth } from '../middlewares/middleware';

const authRoutes = Router();

authRoutes.use(basicAuth);

authRoutes.post('/login', loginController);

export default authRoutes;
