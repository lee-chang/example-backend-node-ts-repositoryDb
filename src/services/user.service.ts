import { deleteUserById, getAllUsers, getUserByEmail, getUserById, updateUserById } from "@/repositories/mongoose/user.repository";
import { User } from "../interfaces/entities/user.interface";
import { ErrorExt, httpStatus } from "@/utils/http.response.util";


// ** CRUD

export const callUser = async (id: string): Promise<User> => {
  const userFount = await getUserById(id);
  if (!userFount) throw new ErrorExt("USER_NOT_EXIST", httpStatus.BAD_REQUEST);
  return userFount;
};

export const listAllUsers = async (): Promise<User[]> => {
  const users = await getAllUsers();
  return users;
}

export const actualizeUser = async (id: string, user: User): Promise<User> => {
  const userUpdated = await updateUserById(id, user);
  if (!userUpdated) throw new ErrorExt("USER_NOT_EXIST", httpStatus.BAD_REQUEST);
  return userUpdated;
}

export const removeUser = async (id: string): Promise<User> => {
  const userDeleted = await deleteUserById(id);
  if (!userDeleted) throw new ErrorExt("USER_NOT_EXIST", httpStatus.BAD_REQUEST);
  return userDeleted;
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
export const  updateRoleByUserId = async (id: string, roles: [string]): Promise<User> => {
  const user = await getUserById(id);

  if (!user) throw new ErrorExt("USER_NOT_EXIST", httpStatus.BAD_REQUEST);


  // ** validar que el rol exista

  const updateUser = await updateUserById(id, { ...user, authority: roles });

  if (!updateUser) throw new ErrorExt("USER_NOT_EXIST", httpStatus.BAD_REQUEST)

  return updateUser
}