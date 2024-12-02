import { Role } from '@prisma/client';
import bcyrpt from 'bcrypt';
import { createUser, findByUsername } from '../repositories/user-repository';
import { generateToken } from '../utils/jwt-helper';

export const loginUser = async (username: string, password: string) => {
  const user = await findByUsername(username);
  if (!user) throw new Error('User not found');

  const isValidPassword = await bcyrpt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  return generateToken({ id: user.id, role: user.role });
};

export const registerUser = async (data: {
  username: string;
  password: string;
  role?: string;
}) => {
  const validRoles = Object.values(Role);
  if (data.role && !validRoles.includes(data.role as Role)) {
    throw new Error(`Invalid role. Valid roles are: ${validRoles.join(', ')}`);
  }

  const hashedPassword = await bcyrpt.hash(data.password, 10);
  return createUser({
    username: data.username,
    password: hashedPassword,
    role: data.role as Role,
  });
};
