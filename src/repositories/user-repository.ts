import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const findByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const createUser = async (data: {
  username: string;
  password: string;
  roleId: string;
}) => {
  return prisma.user.create({ data });
};
