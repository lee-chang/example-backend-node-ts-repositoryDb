import Permission, { PermissionObject } from '@/interfaces/permissions'
import { Role } from '@/interfaces/entities/role.interface'
import {
  createdRole,
  deleteRoleById,
  getAllRoles,
  getRoleById,
  getRoleByName,
  updateRoleById,
} from '@/repositories/mongoose/role.repository'
import { ErrorExt, httpStatus } from '@/utils/http.response.util'

// ** CRUD

export const listAllRoles = async (): Promise<Role[]> => {
  const roles = await getAllRoles()
  return roles
}

export const callRole = async (id: string): Promise<Role> => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  return role
}

export const registerRole = async (role: Role): Promise<Role> => {
  const newRole = await createdRole(role)
  return newRole
}

export const actualizeRole = async (id: string, role: Role) => {
  const updateRole = await updateRoleById(id, role)
  return updateRole
}

export const removeRole = async (id: string): Promise<Role> => {
  const deleteRole = await deleteRoleById(id)

  if (!deleteRole) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  return deleteRole
}

// ** RELATIONSHIPS

export const listPermissionByRol = async (id: string) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  const { permissions } = role

  return permissions
}

// ** UTILS

export const roleNameById = async (id: string) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)
  const { name } = role
  return name
}

export const roleByName = async (name: string) => {
  const role = await getRoleByName(name)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)
  return role
}

export const isValidatePermissionByRol = async (
  id: string,
  permission: Permission
): Promise<Boolean> => {
  const role: Role = await callRole(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  // -> Rol.permissions = [ '[key] del permiso'  ]
  // -> permission = 'value del permiso'

  // ** Buscar la key del permiso en el array de permisos del rol

  const { permissions } = role

  let checking = false

  permissions.forEach((p) => {
    if (Permission[p] === permission) checking = true
  })

  return checking ? true : false
}

export const isValidPermission = (permission: keyof typeof Permission) => {

  const listAllPermissions = Object.keys(Permission)

  const isValid = listAllPermissions.includes(permission)

  return isValid ? true : false
}
// ** PERMISSIONS

export const assignPermissionByRoleId = async (
  id: string,
  permission: keyof typeof Permission
) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  const { permissions } = role

  // ** Validar que el permission sea un key de la enum Permission

  const isValid = isValidPermission(permission)

  if (!isValid) throw new ErrorExt('PERMISSION_NOT_EXIST', httpStatus.BAD_REQUEST)

  // ** Validar que el permission no este duplicado en el array de permissions del rol

  let isDuplicatedPermission = false

  permissions.forEach((p) => {
    if (p === permission) isDuplicatedPermission = true
  })
  if (isDuplicatedPermission) throw new ErrorExt('PERMISSION_ALREADY_EXIST', httpStatus.BAD_REQUEST)

  const keyPermission = Permission[permission]

  console.log('keyPermission', keyPermission)

  permissions.push(permission)

  const updateRole = await updateRoleById(id, role)

  return updateRole
}

export const removePermissionByRoleId = async ( id: string, permission: keyof typeof Permission ) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  const { permissions } = role

  // ** Validar que el permission sea un key de la enum Permission

  const isValid = isValidPermission(permission)

  if (!isValid) throw new ErrorExt('PERMISSION_NOT_EXIST', httpStatus.BAD_REQUEST)

  // ** Validar que el permission no este duplicado en el array de permissions del rol

  let isDuplicatedPermission = false

  permissions.forEach((p) => {
    if (p === permission) isDuplicatedPermission = true
  })
  if (!isDuplicatedPermission) throw new ErrorExt('PERMISSION_NOT_EXIST', httpStatus.BAD_REQUEST)

  const keyPermission = Permission[permission]

  console.log('keyPermission', keyPermission)

  const index = permissions.indexOf(permission)

  permissions.splice(index, 1)

  const updateRole = await updateRoleById(id, role)

  return updateRole
}