import bcyrpt from 'bcrypt';
import { generateToken } from '../utils/jwt-helper';
import { getUserByUsername } from '../repositories/user-repository';

export const loginService = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error('User not found');

  const isValidPassword = await bcyrpt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  return generateToken({ id: user.id, role: user.role });
};
