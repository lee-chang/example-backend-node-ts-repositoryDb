import { Router } from 'express'

import { authRequired } from '@/middlewares/validateToken'
import { checkPermission } from '@/middlewares/validatePermission'

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/controllers/task.controller'

import Permission from '@/interfaces/permissions'

const router = Router()

router.get('/', authRequired, checkPermission(Permission.READ_TASK), getTasks) 
router.get('/:id', authRequired, getTask)
router.post('/', authRequired, createTask)
router.delete('/:id', authRequired, deleteTask)
router.put('/:id', authRequired, updateTask)

export { router }
