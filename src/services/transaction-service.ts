import { PaymentType, Role } from '@prisma/client';
import {
  createTransaction,
  getAllTransaction,
  getTransactionById,
} from '../repositories/transaction-repository';
import { getUserByIdService } from './user-service';
import { TransactionDetailInterface } from '../model/transaction-detail-interface';
import { getProductByIdService, updateProductService } from './product-service';
import { decodeToken } from '../utils/jwt-helper';

export const createTransactionService = async (data: {
  userId: string;
  paymentType: string;
  transactionDetails: TransactionDetailInterface[];
}) => {
  const user = await getUserByIdService(data.userId, Role.CASHIER);
  if (!user) return;

  const paymentType = Object.values(PaymentType).includes(
    data.paymentType as PaymentType,
  );

  if (!paymentType) {
    throw new Error('Invalid payment type');
  }

  let total = 0;

  const transactionDetails = await Promise.all(
    data.transactionDetails.map(async (value) => {
      const product = await getProductByIdService(value.productId);
      await updateProductService({
        id: value.productId,
        stock: product!.stock - value.quantity,
        name: product!.name,
        price: product!.price,
        description: product!.description!.toString(),
      });
      total += product!.price * value.quantity;
      return {
        price: product!.price,
        ...value,
      };
    }),
  );

  const newTransactionData = {
    total: total,
    userId: user.id,
    paymentType: data.paymentType as PaymentType,
    transactionDetails: transactionDetails,
  };

  return await createTransaction(newTransactionData);
};

export const getTransactionByIdService = async (id: string, token: string) => {
  const decodedToken = decodeToken(token);
  if (decodedToken.role === Role.ADMIN)
    return await getTransactionById(id, null);
  return await getTransactionById(id, decodedToken.id);
};

export const getAllTransactionService = async (
  paymentType: string | undefined,
  token: string,
) => {
  const decodedToken = decodeToken(token);

  if (paymentType === undefined && decodedToken.role === Role.ADMIN)
    return await getAllTransaction(undefined, null);
  if (paymentType === undefined)
    return await getAllTransaction(undefined, decodedToken.id);

  const payType = Object.values(PaymentType).includes(
    paymentType as PaymentType,
  );

  if (!payType) {
    throw new Error('Invalid payment type');
  }

  if (decodedToken.role === Role.ADMIN)
    return await getAllTransaction(paymentType as PaymentType, null);

  return await getAllTransaction(paymentType as PaymentType, decodedToken.id);
};
