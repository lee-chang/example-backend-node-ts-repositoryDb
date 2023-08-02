import { getUserByEmail, getUserById } from "@/repositories/mongoose/user.repository";
import { User } from "../interfaces/user.interface";

export const isUserExistWithEmail = async (email: string): Promise<Boolean> => {
  const userFount = await getUserByEmail(email);
  return userFount ? true : false;
};

export const isUserExistWithId = async (id: string): Promise<Boolean> => {
  const userFount = await getUserById(id);
  return userFount ? true : false;
};

export const callUser = async (id: string): Promise<User | null> => {
  const userFount = await getUserById(id);
  return userFount;
};
