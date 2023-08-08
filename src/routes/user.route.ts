
import { updateUser, getUser,getUsers } from '@/controllers/user.controller'
import Permission from '@/interfaces/permissions'
import { checkPermission } from '@/middlewares/validatePermission'
import { authRequired } from '@/middlewares/validateToken'
import { Router } from 'express'
const router = Router()


// ** CRUD
router.get('/',  getUsers)
router.get('/:id', getUser)
// router.post('/', createRole)
// router.delete('/:id', authRequired, deleteRole)
router.put('/:id', authRequired, updateUser)

// ** RELATIONSHIPS
router.put('/:id/role-assign', authRequired, checkPermission(Permission.ASSIGN_ROLE), updateUser)


export { router }
