import { Role } from "@prisma/client";
import { findRoleByName } from "@repositories/role-repository";
import { createUser, findByUsername } from "@repositories/user-repository";
import bcyrpt from "bcrypt";

export const loginUser = async (username: string, password: string) => {
  const user = await findByUsername(username);
  if (!user) throw new Error("User not found");

  const isValidPassword = await bcyrpt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid password");

  return "generatedToken";
};

export const registerUser = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  const role = await findRoleByName(data.role);
  if (!role) throw new Error("Role not found");

  const hashedPassword = await bcyrpt.hash(data.password, 10);
  return createUser({
    username: data.username,
    password: hashedPassword,
    roleId: role.id,
  });
};
