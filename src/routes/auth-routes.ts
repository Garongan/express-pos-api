import { Router } from 'express';
import {
  loginController,
  registerController,
} from '../controllers/auth-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const authRoutes = Router();

authRoutes.post('/login', loginController);
authRoutes.post('/register', authMiddleware, registerController);

export default authRoutes;
