import bcyrpt from 'bcrypt';
import { findUserByUsername } from '../repositories/user-repository';
import { generateToken } from '../utils/jwt-helper';

export const loginUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);
  if (!user) throw new Error('User not found');

  const isValidPassword = await bcyrpt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  return generateToken({ id: user.id, role: user.role });
};
