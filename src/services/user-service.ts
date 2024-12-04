import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import {
  activateUser,
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  getUserByUsername,
  updateUser,
} from '../repositories/user-repository';

export const registerUserService = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  const existingUser = await getUserByUsername(data.username);
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

export const getAllUserService = async (role: Role, isDeleted?: string) => {
  if (isDeleted === 'false' || isDeleted === undefined) {
    return await getAllUser(false, role);
  }

  if (isDeleted === 'true') {
    return await getAllUser(true, role);
  }

  throw new Error('Invalid params');
};

export const getUserByIdService = async (id: string, role: Role) => {
  return await getUserById(id, role);
};

export const deleteUserService = async (id: string, role: Role) => {
  return await deleteUser(id, role);
};

export const updateUserService = async (data: {
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

export const activateUserService = async (id: string) => {
  const activatedUser = await activateUser(id);
  if (activatedUser.deletedAt === null) {
    throw new Error('User already active');
  }
  return activatedUser;
};
