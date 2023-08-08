import { Router } from 'express'
import { register, login, logout, profile } from '@/controllers/auth.controller'

import { authRequired } from '@/middlewares/validateToken'
import { validateSchema } from '@/middlewares/validatorSchema'
import { registerSchema, loginSchema } from '@/schemas/auth.schema'

const router = Router()

/*
 ** http://localhost:PORT/api/{apiVersion}/auth/[...]
 */

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', authRequired, logout)
router.get('/profile', authRequired, profile)

export { router }
