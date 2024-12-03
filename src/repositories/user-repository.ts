import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({ where: { username: username } });
};

export const createUser = (data: {
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

export const findUserById = (id: string, role: Role) => {
  return prisma.user.findUnique({
    where: { id: id, role: role },
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

export const getAllUser = (isDeleted: boolean, role: Role) => {
  return isDeleted
    ? prisma.user.findMany({
        where: { deletedAt: { not: null }, role: role },
        select: {
          id: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      })
    : prisma.user.findMany({
        where: { role: role, deletedAt: null },
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

export const deleteUserById = (id: string, role: Role) => {
  return prisma.user.update({
    where: { id: id, deletedAt: null, role: role },
    data: { deletedAt: new Date() },
  });
};

export const updateUser = (data: {
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

export const activateUser = (id: string) => {
  return prisma.user.update({
    where: { id: id },
    data: {
      deletedAt: null,
    },
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
