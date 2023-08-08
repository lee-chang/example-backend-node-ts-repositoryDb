import { isValidatePermissionByRol } from '@/services/role.service'
import {
  ErrorExt,
  HttpResponse,
  handleError,
  httpStatus,
} from '@/utils/http.response.util'
import { Request, Response, NextFunction } from 'express'

import Permission from '@/interfaces/permissions'

/**
 *
 * @param authority Array de roles que pueden acceder a la ruta
 * @returns
 */

const checkPermission = (permission: Permission) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      // ** 1. Obtener el rol del usuario

      // req.user ->  Payload { id: string, authority: string[] }  path: @\interfaces\jwt.payload

      if (!req.user?.authority || req.user?.authority.length === 0) {
        HttpResponse.Error(res, {
          error: 'ROL_NOT_EXIT',
          status: httpStatus.UNAUTHORIZED,
        })
      }
      const arrRoleId: string[] = req.user?.authority

      // console.log('ROL BY USER', arrRoleId)

      const promises = arrRoleId.map(async (id) => {
        const isPermissionValid = await isValidatePermissionByRol(
          id,
          permission
        )
        return isPermissionValid
      })

      const results = await Promise.all(promises)
      const hasPermission = results.some((result) => result === true)

      // console.log('hasPermission', hasPermission)
      
      if (hasPermission) {
        next()
      } else {
        HttpResponse.Error(res, {
          error: 'PERMISSION_NOT_VALID',
          status: httpStatus.UNAUTHORIZED,
        })
      }
    } catch (err) {
      if (err instanceof ErrorExt) {
        handleError.call(res, err)
      } else {
        HttpResponse.Error(res, err)
      }
    }
  }
}
export { checkPermission }
