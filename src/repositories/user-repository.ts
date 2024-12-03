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
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const findUserById = async (id: string, role: Role) => {
  return prisma.user.findUnique({
    where: { id: id, deletedAt: null, role: role },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const getAllUser = async (role: Role) => {
  return prisma.user.findMany({
    where: { deletedAt: null, role: role },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const deleteUserById = async (id: string, role: Role) => {
  return prisma.user.update({
    where: { id: id, deletedAt: null, role: role },
    data: { deletedAt: new Date() },
  });
};

export const updateUser = async (data: {
  id: string;
  username: string;
  password: string;
  role: Role;
}) => {
  return prisma.user.update({
    where: { id: data.id, deletedAt: null },
    data: data,
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};
