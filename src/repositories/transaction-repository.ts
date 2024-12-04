import { PaymentType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = (data: {
  total: number;
  userId: string;
  paymentType: PaymentType;
  transactionDetails: { productId: string; quantity: number; price: number }[];
}) => {
  return prisma.transaction.create({
    data: {
      ...data,
      transactionDetails: {
        create: data.transactionDetails.map((value) => {
          return {
            productId: value.productId,
            quantity: value.quantity,
            price: value.price,
          };
        }),
      },
    },
  });
};

export const getTransactionById = (id: string, userId: string | null) => {
  if (userId === null)
    return prisma.transaction.findUnique({ where: { id: id } });

  return prisma.transaction.findUnique({ where: { id: id, userId: userId } });
};

export const getAllTransaction = (
  paymentType: PaymentType | undefined,
  userId: string | null,
) => {
  if (paymentType === undefined && userId === null)
    return prisma.transaction.findMany();

  if (paymentType === undefined && userId !== null)
    return prisma.transaction.findMany({ where: { userId: userId } });

  if (userId === null)
    return prisma.transaction.findMany({ where: { paymentType: paymentType } });

  return prisma.transaction.findMany({
    where: { paymentType: paymentType, userId: userId },
  });
};
