import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username: username } });
};

export const createUser = async (data: {
  username: string;
  password: string;
  role?: Role;
}) => {
  return prisma.user.create({
    data: { ...data, role: data.role || Role.CASHIER },
  });
};

export const findCashierById = async (id: string) => {
  return prisma.user.findUnique({ where: { id: id, deletedAt: null } });
};

export const getAllUser = async () => {
  return prisma.user.findMany({
    where: { deletedAt: null },
  });
};

export const deleteUserById = async (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const updateUser = async (data: {
  id: string;
  username: string;
  password: string;
  role?: Role;
}) => {
  return prisma.user.update({
    where: { id: data.id, deletedAt: null },
    data: data,
  });
};
