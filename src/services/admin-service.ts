import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import {
  createUser,
  deleteUserById,
  findUserById,
  findUserByUsername,
  getAllUser,
  updateUser,
} from '../repositories/user-repository';

export const registerCashierService = async (data: {
  username: string;
  password: string;
  role?: string;
}) => {
  const existingUser = await findUserByUsername(data.username);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const validRoles = Object.values(Role);
  if (data.role && !validRoles.includes(data.role as Role)) {
    throw new Error(`Invalid role. Valid roles are: ${validRoles.join(', ')}`);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  return createUser({
    username: data.username,
    password: hashedPassword,
    role: data.role as Role,
  });
};

export const getAllCashierService = async () => {
  return getAllUser(Role.CASHIER);
};

export const getCashierService = async (id: string) => {
  return findUserById(id, Role.CASHIER);
};

export const deleteCahiserService = async (id: string) => {
  return deleteUserById(id, Role.CASHIER);
};

export const updateCashierService = async (data: {
  id: string;
  username: string;
  password: string;
  role: Role;
}) => {
  if (!Object.values(Role).includes(data.role)) {
    throw new Error('Invalid role');
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return updateUser({ ...data, password: hashedPassword });
};
