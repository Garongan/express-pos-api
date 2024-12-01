import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findRoleByName = async (roleName: string) => {
  return prisma.role.findFirst({ where: { name: roleName } });
};
