import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductById = (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const getProductByName = (name: string) => {
  return prisma.product.findUnique({
    where: { name: name },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const getAllProduct = (isDeleted: boolean) => {
  return isDeleted
    ? prisma.product.findMany({
        where: { deletedAt: { not: null } },
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      })
    : prisma.product.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
};

export const createProduct = (data: {
  name: string;
  price: number;
  stock: number;
  description: string;
}) => {
  return prisma.product.create({
    data,
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const updateProduct = (data: {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}) => {
  return prisma.product.update({
    where: { id: data.id, deletedAt: null },
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.description,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const deleteProduct = (id: string) => {
  return prisma.product.update({
    where: { id: id, deletedAt: null },
    data: { deletedAt: new Date() },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const activateProduct = (id: string) => {
  return prisma.product.update({
    where: { id: id, deletedAt: { not: null } },
    data: { deletedAt: null },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};
