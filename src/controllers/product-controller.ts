import { Request, Response } from 'express';
import {
  activateProductService,
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
} from '../services/product-service';
import { commonResponse, errorResponse } from '../utils/custom-responses';

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    commonResponse(res, 200, { product });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getAllProductController = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    const products = await getAllProductService(isDeleted?.toString());
    commonResponse(res, 200, { products });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, description } = req.body;
    const createdProduct = await createProductService({
      name,
      price,
      stock,
      description,
    });
    commonResponse(res, 201, { createdProduct });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;
    const updatedProduct = await updateProductService({
      id,
      name,
      price,
      stock,
      description,
    });
    commonResponse(res, 200, { updatedProduct });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductService(id);
    if (deletedProduct)
      commonResponse(res, 200, { message: 'Product has been deleted' });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const activatedProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const activateProduct = await activateProductService(id);
    if (activateProduct)
      commonResponse(res, 200, { message: 'Product has been activated' });
  } catch (error) {
    errorResponse(res, error);
  }
};
