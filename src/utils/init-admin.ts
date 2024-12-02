import bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const initAdmin = async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  const existingAdmin = await prisma.user.findUnique({
    where: { username: username! },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password!, 10);

    await prisma.user.create({
      data: {
        username: username!,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log(`Admin user created with username: ${username}`);
  } else {
    console.log(`Admin user already exists with username: ${username}`);
  }
};
