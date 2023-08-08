import { User } from '@/interfaces/entities/user.interface'
import UserModel from '@/models/user.model'

export const getAllUsers = async () => {
  const users = await UserModel.find()
  return users
}

export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id)
  return user
}

export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })
  return user
}

export const createdUser = async (user: User) => {
  const userCreated = await UserModel.create(user)
  return userCreated
}

export const updateUserById = async (id: string, user: User) => {
  const updateUser = await UserModel.findByIdAndUpdate(id, user, { new: true })
  return updateUser
}

export const deleteUserById = async (id: string) => {
  const deleteUser = await UserModel.findByIdAndDelete(id)
  return deleteUser
}
