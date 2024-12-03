import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import {
  activateUser,
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
  return await createUser({
    username: data.username,
    password: hashedPassword,
    role: data.role as Role,
  });
};

export const getAllCashierService = async (isDeleted?: string) => {
  if (isDeleted === 'false' || isDeleted === undefined) {
    return await getAllUser(false, Role.CASHIER);
  }

  if (isDeleted === 'true') {
    return await getAllUser(true, Role.CASHIER);
  }

  throw new Error('Invalid params');
};

export const getCashierService = async (id: string) => {
  return await findUserById(id, Role.CASHIER);
};

export const deleteCahiserService = async (id: string) => {
  return await deleteUserById(id, Role.CASHIER);
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
  return await updateUser({ ...data, password: hashedPassword });
};

export const activateCashierService = async (id: string) => {
  const activatedUser = await activateUser(id);
  if (activatedUser.deletedAt === null) {
    throw new Error('User already active');
  }
  return activatedUser;
};
