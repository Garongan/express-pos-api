import { PaymentType, Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createTransaction } from '../repositories/transaction-repository';
import { getUserByIdService } from './user-service';
import { TransactionDetailInterface } from '../model/transaction-detail-interface';

export const createTransactionService = async (data: {
  userId: string;
  paymentType: string;
  transactionDetails: TransactionDetailInterface[];
}) => {
  const transactionId = uuidv4();

  const user = await getUserByIdService(data.userId, Role.CASHIER);
  if (!user) return;

  const paymentType = Object.values(PaymentType).includes(
    data.paymentType as PaymentType,
  );

  if (!paymentType) {
    throw new Error('Invalid payment type');
  }

  const total = data.transactionDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const transactionDetails = data.transactionDetails.map((value) => {
    return {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      transactionId: transactionId,
      ...value,
    };
  });

  const newTransactionData = {
    id: transactionId,
    total: total,
    userId: user.id,
    paymentType: data.paymentType as PaymentType,
    transactionDetails: transactionDetails,
  };

  return await createTransaction(newTransactionData);
};
