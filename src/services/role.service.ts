import Permission, { KeyPermissions } from '@/interfaces/permissions'
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

export const existRoleById = async (id: string): Promise<Boolean> => {
  const role = await getRoleById(id)
  return role ? true : false
}

export const isValidatePermissionByRol = async (
  id: string,
  permission: Permission
): Promise<Boolean> => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  // -> Rol.permissions = [ '[key] del permiso'  ]
  // -> permission = 'value del permiso'

  // ** Buscar la key del permiso en el array de permisos del rol

  const { permissions }: { permissions: [KeyPermissions] } = role

  let checking = false

  // ** Si tiene el permissions tiene ALL_PERMISSIONS no se valida el permiso

  const hasAllPermissions = permissions.includes('ALL_PERMISSIONS')

  if (hasAllPermissions) return true

  permissions.forEach((p) => {
    if (Permission[p] === permission) checking = true
  })

  return checking ? true : false
}

export const isValidPermission = (permission: KeyPermissions) => {
  const listAllPermissions = Object.keys(Permission)

  const isValid = listAllPermissions.includes(permission)

  return isValid ? true : false
}

export const addUserInRol = async (idUser: string, idRole: string) => {
  const role = await getRoleById(idRole)

  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  // ** Validar que el usuario no este duplicado en el array de usuarios del rol

  const { users } = role

  let isDuplicatedUser = false

  users.forEach((u) => {
    if (u === idUser) isDuplicatedUser = true
  })

  if (!isDuplicatedUser) role.users.push(idUser)

  const updateRole = role.save()

  return updateRole
}

export const removeUserInRol = async (idUser: string, idRole: string) => {
  const role = await getRoleById(idRole)

  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  const { users } = role

  const index = users.indexOf(idUser)

  if (index > -1) {
    users.splice(index, 1)
  }

  const updateRole = role.save()

  return updateRole
}

// ** PERMISSIONS

export const assignPermissionByRoleId = async (
  id: string,
  permission: KeyPermissions
) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  const { permissions } = role

  // ** Validar que el permission sea un key de la enum Permission

  const isValid = isValidPermission(permission)

  if (!isValid)
    throw new ErrorExt('PERMISSION_NOT_EXIST', httpStatus.BAD_REQUEST)

  // ** Validar que el permission no este duplicado en el array de permissions del rol

  let isDuplicatedPermission = false

  permissions.forEach((p) => {
    if (p === permission) isDuplicatedPermission = true
  })
  if (isDuplicatedPermission)
    throw new ErrorExt('PERMISSION_ALREADY_EXIST', httpStatus.BAD_REQUEST)

  const keyPermission = Permission[permission]

  console.log('keyPermission', keyPermission)

  permissions.push(permission)

  const updateRole = await updateRoleById(id, role)

  return updateRole
}

export const removePermissionByRoleId = async (
  id: string,
  permission: KeyPermissions
) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  const { permissions } = role

  // ** Validar que el permission sea un key de la enum Permission

  const isValid = isValidPermission(permission)

  if (!isValid)
    throw new ErrorExt('PERMISSION_NOT_EXIST', httpStatus.BAD_REQUEST)

  // ** Validar que el permission no este duplicado en el array de permissions del rol

  let isDuplicatedPermission = false

  permissions.forEach((p) => {
    if (p === permission) isDuplicatedPermission = true
  })
  if (!isDuplicatedPermission)
    throw new ErrorExt('PERMISSION_NOT_EXIST', httpStatus.BAD_REQUEST)

  const keyPermission = Permission[permission]

  console.log('keyPermission', keyPermission)

  const index = permissions.indexOf(permission)

  permissions.splice(index, 1)

  const updateRole = await updateRoleById(id, role)

  return updateRole
}

//se puede usar para actualizar los permisos de un rol
export const updatePermissionsByRoleId = async (
  id: string,
  permissions: [KeyPermissions]
) => {
  const role = await getRoleById(id)
  if (!role) throw new ErrorExt('ROLE_NOT_EXIST', httpStatus.BAD_REQUEST)

  // ** Actualizar los permisos del rol

  role.permissions = permissions

  const roleUpdated = await role.save()

  return roleUpdated
}
