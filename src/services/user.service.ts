import { getAllUsers, getUserByEmail, getUserById, updateUserById } from "@/repositories/mongoose/user.repository";
import { User } from "../interfaces/entities/user.interface";


// ** CRUD

export const callUser = async (id: string): Promise<User> => {
  const userFount = await getUserById(id);
  if (!userFount) throw new Error("USER_NOT_EXIST");
  return userFount;
};

export const listAllUsers = async (): Promise<User[]> => {
  const users = await getAllUsers();
  return users;
}

export const actualizeUser = async (id: string, user: User): Promise<User> => {
  const userUpdated = await updateUserById(id, user);
  if (!userUpdated) throw new Error("USER_NOT_EXIST");
  return userUpdated;
}


// ** UTILS

export const isUserExistWithEmail = async (email: string): Promise<Boolean> => {
  const userFount = await getUserByEmail(email);
  return userFount ? true : false;
};

export const isUserExistWithId = async (id: string): Promise<Boolean> => {
  const userFount = await getUserById(id);
  return userFount ? true : false;
};


// ** RELATIONSHIPS
export const  updateRoleByUser = async (id: string, idRole: string) => {
  const user = await callUser(id);
  // const role = await callRole(idRole);
  // user.roles.push(role);
  // await user.save();
  return user;
}