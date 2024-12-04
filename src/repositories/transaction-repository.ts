import { PaymentType, PrismaClient, TransactionDetail } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = (data: {
  id: string;
  total: number;
  userId: string;
  paymentType: PaymentType;
  transactionDetails: TransactionDetail[];
}) => {
  return prisma.transaction.create({
    data: {
      ...data,
      transactionDetails: {
        create: data.transactionDetails,
      },
    },
  });
};

export const getTransactionById = (id: string) => {
  return prisma.transaction.findUnique({ where: { id: id } });
};

export const getAllTransaction = () => {
  return prisma.transaction.findMany();
};
