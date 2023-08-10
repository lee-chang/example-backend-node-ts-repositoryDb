import {
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
} from '@/repositories/mongoose/user.repository'
import { User } from '../interfaces/entities/user.interface'
import { ErrorExt, httpStatus } from '@/utils/http.response.util'
import { getRoleById } from '@/repositories/mongoose/role.repository'
import { addUserInRol, removeUserInRol } from './role.service'
import { addAbortSignal } from 'nodemailer/lib/xoauth2'

// ** CRUD

export const callUser = async (id: string): Promise<User> => {
  const userFount = await getUserById(id)
  if (!userFount) throw new ErrorExt('USER_NOT_EXIST', httpStatus.BAD_REQUEST)
  return userFount
}

export const listAllUsers = async (): Promise<User[]> => {
  const users = await getAllUsers()
  return users
}

export const actualizeUser = async (id: string, user: User): Promise<User> => {
  const userUpdated = await updateUserById(id, user)
  if (!userUpdated) throw new ErrorExt('USER_NOT_EXIST', httpStatus.BAD_REQUEST)
  return userUpdated
}

export const removeUser = async (id: string): Promise<User> => {
  const userDeleted = await deleteUserById(id)
  if (!userDeleted) throw new ErrorExt('USER_NOT_EXIST', httpStatus.BAD_REQUEST)
  return userDeleted
}

// ** UTILS

export const isUserExistWithEmail = async (email: string): Promise<Boolean> => {
  const userFount = await getUserByEmail(email)
  return userFount ? true : false
}

export const isUserExistWithId = async (id: string): Promise<Boolean> => {
  const userFount = await getUserById(id)
  return userFount ? true : false
}

// ** RELATIONSHIPS
export const updateRoleByUserId = async (
  id: string,
  roles: [string]
): Promise<User> => {
  const user = await getUserById(id);

  if (!user) {
    throw new ErrorExt('USER_NOT_EXIST', httpStatus.BAD_REQUEST);
  }

  const { authority: oldRoles } = user;

  // Validar si los roles existen
  const invalidRoles = await Promise.all(roles.map(async (role) => {
    const roleFound = await getRoleById(role);
    return roleFound ? null : role;
  }));

  if (invalidRoles.some(role => role !== null)) {
    throw new ErrorExt('ROLE_NOT_VALID', httpStatus.BAD_REQUEST);
  }

  if (JSON.stringify(roles) === JSON.stringify(oldRoles)) {
    throw new ErrorExt('NO_CHANGE_ROLES', httpStatus.BAD_REQUEST);
  }

  const newRoleList: [string] = [...oldRoles];

  const someNewRoles = roles.filter((r) => !oldRoles.includes(r));

  await Promise.all(someNewRoles.map(async (r) => {
    await addUserInRol(user.id, r);
    newRoleList.push(r);
  }));

  const someRemovedRoles = oldRoles.filter((r) => !roles.includes(r));

  await Promise.all(someRemovedRoles.map(async (r) => {
    await removeUserInRol(user.id, r);
    const index = newRoleList.indexOf(r);
    if (index !== -1) {
      newRoleList.splice(index, 1);
    }
  }));

  console.log('isNewRole', someNewRoles);
  console.log('isDeleteRole', someRemovedRoles);

  user.authority = newRoleList;

  const updateUser = await user.save();

  return updateUser;
};