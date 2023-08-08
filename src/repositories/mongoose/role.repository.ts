import { Role } from '@/interfaces/entities/role.interface'
import { RoleModel } from '@/models/rol.model'

export const getAllRoles = async () => {
  const roles = await RoleModel.find()
  return roles
}

export const getRoleById = async (id: string) => {
  const role = await RoleModel.findById(id)
  return role
}

export const getRoleByName = async (name: string) => {
  const role = await RoleModel.findOne({ name:name })
  return role
}

export const createdRole = async (rol: Role) => {
  const newRole = new RoleModel(rol)
  const roleCreated = await newRole.save()
  return roleCreated
}

export const updateRoleById = async (id: string, rol: Role) => {
  const updateRol = await RoleModel.findByIdAndUpdate(id, rol, { new: true })
  return updateRol
}

export const deleteRoleById = async (id: string) => {
  const deleteRole = await RoleModel.findByIdAndDelete(id)
  return deleteRole
}


