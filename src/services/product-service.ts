import {
  activateProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  getProductByName,
  updateProduct,
} from '../repositories/product-repository';

export const getProductByIdService = async (id: string) => {
  return await getProductById(id);
};

export const getAllProductService = async (isDeleted?: string) => {
  if (isDeleted === 'false' || isDeleted === undefined) {
    return await getAllProduct(false);
  }

  if (isDeleted === 'true') {
    return await getAllProduct(true);
  }

  throw new Error('Invalid params');
};

export const createProductService = async (data: {
  name: string;
  price: number;
  stock: number;
  description: string;
}) => {
  const existingProduct = await getProductByName(data.name);
  if (existingProduct) {
    throw new Error('Product already exists');
  }

  return await createProduct(data);
};

export const updateProductService = async (data: {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}) => {
  return await updateProduct(data);
};

export const deleteProductService = async (id: string) => {
  return await deleteProduct(id);
};

export const activateProductService = async (id: string) => {
  const existingUser = await getProductByIdService(id);

  if (existingUser && existingUser.deletedAt === null) {
    throw new Error('Product already active');
  }
  return await activateProduct(id);
};
