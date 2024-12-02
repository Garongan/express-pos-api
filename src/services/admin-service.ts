import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import {
  createUser,
  findUserByUsername,
} from '../repositories/user-repository';

export const registerUser = async (data: {
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
