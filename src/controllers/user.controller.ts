import { Request, Response } from 'express'
import { ErrorExt, HttpResponse, handleError, httpStatus } from '@/utils/http.response.util'
import {
  actualizeUser,
  callUser,
  listAllUsers,
  removeUser,
  updateRoleByUserId,
} from '@/services/user.service'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await listAllUsers()
    HttpResponse.Ok(res, users)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const task = await callUser(id)
    HttpResponse.Ok(res, task)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = req.body
  try {
    const userUpdated = await actualizeUser(id, user)
    HttpResponse.Ok(res, userUpdated)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const userDeleted = await removeUser(id)
    HttpResponse.Ok(res, userDeleted)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const updateRolesByUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { authority }: {authority: [string]} = req.body

  try {
    const userUpdated = await updateRoleByUserId(id, authority)
    HttpResponse.Ok(res, userUpdated)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}