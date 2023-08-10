import { Request, Response } from 'express'
import { ErrorExt, HttpResponse, handleError, httpStatus } from '@/utils/http.response.util'
import {
  listAllRoles,
  actualizeRole,
  removeRole,
  callRole,
  registerRole,
  updatePermissionsByRoleId,
  isValidPermission,
} from '@/services/role.service'
import { Role } from '@/interfaces/entities/role.interface'
import Permission, { KeyPermissions, PermissionObject } from '@/interfaces/permissions'

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
    acc[key] = Permission[key as KeyPermissions]
    return acc
  }, {} as PermissionObject)

  return HttpResponse.Ok(res, permissions)
}

export const updatePermissionsByRole = async (req: Request, res: Response) => {
  const { id } = req.params
  const { permissions }: { permissions: [KeyPermissions] } = req.body

  try {
    permissions.map((p) => {
      console.log(p)
      if (!isValidPermission(p)) {
        throw new ErrorExt('PERMISSION_NOT_VALID', httpStatus.BAD_REQUEST)
      }
    })

    const role = await updatePermissionsByRoleId(id, permissions)
    HttpResponse.Ok(res, role)
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err)
    } else {
      HttpResponse.Error(res, err)
    }
  }
}
