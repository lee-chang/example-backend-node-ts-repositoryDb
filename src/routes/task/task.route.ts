import { Router } from 'express'
import { authRequired } from '@/middlewares/validateToken'
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/controllers/task.controller'
import { checkRol } from '@/middlewares/validateRol'
import { ROL } from '@/interfaces/user.interface'

const router = Router()

router.get('/tasks', authRequired, checkRol([ROL.ADMIN]), getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, createTask)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id', authRequired, updateTask)

export { router }
