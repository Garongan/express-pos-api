import { Router } from 'express';
import {
  activateUserController,
  deleteUserController,
  getAllUserController,
  registerUserController,
  updateUserController,
} from '../controllers/user-controller';
import { adminMiddleware, authMiddleware } from '../middlewares/middleware';

const adminRoutes = Router();

adminRoutes.use(authMiddleware);
adminRoutes.use(adminMiddleware);

adminRoutes.get('/', getAllUserController);
adminRoutes.post('/register', registerUserController);
adminRoutes.delete('/:id', deleteUserController);
adminRoutes.put('/:id', updateUserController);
adminRoutes.put('/:id/activate', activateUserController);

export default adminRoutes;
