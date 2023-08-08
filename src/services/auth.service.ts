import { User } from '@/interfaces/entities/user.interface'
import { Payload } from '@/interfaces/jwt.payload.interface'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/utils/jwt.util'
import { Auth } from '@/interfaces/auth.interface'
import {
  createdUser,
  getUserByEmail,
} from '@/repositories/mongoose/user.repository'
import { ErrorExt, httpStatus } from '@/utils/http.response.util'
import { callRole } from './role.service'

import { verify } from 'jsonwebtoken'
import { TOKEN_SECRET } from '@/config/env'

export const createUser = async (user: User) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword

  if (user.authority.length > 0) {
    // Existe el rol?
    user.authority.map(async (role) => {
      await callRole(role)
    })
  }

  const newUser = await createdUser(user)

  const payload: Payload = {
    id: newUser._id,
    authority: newUser.authority,
  }
  const token = await generateToken(payload)
  if (!token) throw new Error('TOKEN_NOT_GENERATED')

  return { token, user: newUser }
}

export const authenticationUser = async (user: Auth) => {
  const isRememberMe = user.rememberMe ? user.rememberMe : false

  const userFount = await getUserByEmail(user.email)
  if (!userFount) throw new Error('CREDENTIAL_INVALID')

  const validPassword = await bcrypt.compare(user.password, userFount.password)
  if (!validPassword) throw new Error('CREDENTIAL_INVALID')

  const payload: Payload = {
    id: userFount._id,
    authority: userFount.authority,
    rememberMe: isRememberMe,
  }

  const token = await generateToken(payload)
  if (!token) throw new Error('TOKEN_NOT_GENERATED')

  return { token, user: userFount }
}
