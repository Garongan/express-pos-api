import { Router } from 'express';
import { adminMiddleware, authMiddleware } from '../middlewares/middleware';
import {
  activatedProductController,
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductByIdController,
  updateProductController,
} from '../controllers/product-controller';

const productRoutes = Router();

// auth middleware
productRoutes.use(authMiddleware);
productRoutes.get('/:id', getProductByIdController);
productRoutes.get('/', getAllProductController);

// auth and admin middleware
productRoutes.post('/', adminMiddleware, createProductController);
productRoutes.put('/:id', adminMiddleware, updateProductController);
productRoutes.delete('/:id', adminMiddleware, deleteProductController);
productRoutes.put('/:id/activate', adminMiddleware, activatedProductController);

export default productRoutes;
