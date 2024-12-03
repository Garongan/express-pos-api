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

productRoutes.use(authMiddleware);
productRoutes.use(adminMiddleware);

productRoutes.get('/:id', getProductByIdController);
productRoutes.get('/', getAllProductController);
productRoutes.post('/', createProductController);
productRoutes.put('/:id', updateProductController);
productRoutes.delete('/:id', deleteProductController);
productRoutes.put('/:id/activate', activatedProductController);

export default productRoutes;
