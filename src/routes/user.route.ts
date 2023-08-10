import {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from '@/controllers/user.controller'
import Permission from '@/interfaces/permissions'
import { checkPermission } from '@/middlewares/validatePermission'
import { authRequired } from '@/middlewares/validateToken'
import { Router } from 'express'
const router = Router()

// ** CRUD
router.get('/',authRequired, getUsers)
router.get('/:id', authRequired, getUser)
// router.post('/', createRole)
router.delete('/:id', authRequired, deleteUser)
router.put('/:id', authRequired, updateUser)

// ** RELATIONSHIPS
router.put(
  '/:id/roles',
  authRequired,
  updateUser
)

export { router }
