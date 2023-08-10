import { Router } from 'express'
import { createRole, deleteRole, getRole, getRoles, updateRole, listPermissions, updatePermissionsByRole } from '@/controllers/role.controller'
import Permission from '@/interfaces/permissions'
import { checkPermission } from '@/middlewares/validatePermission'
import { authRequired } from '@/middlewares/validateToken'
const router = Router()

// ** CRUD
router.get('/', authRequired, getRoles)
router.get('/:id', authRequired, getRole)
router.post('/',authRequired , createRole)
router.delete('/:id', authRequired, deleteRole)
router.put('/:id', authRequired, updateRole)

// ** RELATIONSHIPS
router.put('/:id/permissions', authRequired, updatePermissionsByRole)


// ** PERMISSION
router.get('/permissions', authRequired,  listPermissions)



export { router }
