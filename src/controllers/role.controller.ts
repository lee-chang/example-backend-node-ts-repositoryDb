import { Request, Response } from 'express'
import { ErrorExt, HttpResponse, handleError } from '@/utils/http.response.util'
import {
  listAllRoles,
  actualizeRole,
  removeRole,
  callRole,
  registerRole,
  assignPermissionByRoleId,
  removePermissionByRoleId,
} from '@/services/role.service'
import { Role } from '@/interfaces/entities/role.interface'
import Permission, { PermissionObject } from '@/interfaces/permissions'

export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await listAllRoles()
    HttpResponse.Ok(res, roles)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const getRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const role = await callRole(id)
    HttpResponse.Ok(res, role)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const role: Role = req.body
  try {
    const newRole = await registerRole(role)

    HttpResponse.Ok(res, newRole)
  } catch (err) {
    console.log(err)
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const role = await removeRole(id)
    HttpResponse.Ok(res, role)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const role: Role = req.body
  try {
    const updateRole = await actualizeRole(id, role)
    HttpResponse.Ok(res, updateRole)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

// ** PERMISSIONS

export const listPermissions = async (req: Request, res: Response) => {
  // return object "KEYS" : "VALUES" from enum Permission

  const permissions = Object.keys(Permission).reduce((acc, key) => {
    acc[key] = Permission[key as keyof typeof Permission]
    return acc
  }, {} as PermissionObject)

  return HttpResponse.Ok(res, permissions)
}

export const assignPermission = async (req: Request, res: Response) => {
  const { id } = req.params
  const { permission } = req.body

  try {
    const role = await assignPermissionByRoleId(id, permission)
    HttpResponse.Ok(res, role)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}

export const removePermission = async (req: Request, res: Response) => {
  const { id } = req.params
  const { permission } = req.body

  try {
    const role = await removePermissionByRoleId(id, permission)
    HttpResponse.Ok(res, role)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}