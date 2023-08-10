import { Request, Response, NextFunction } from 'express'
import {
  ErrorExt,
  HttpResponse,
  handleError,
  httpStatus,
} from '@/utils/http.response.util'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '@/config/env'

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Recuperar token de la cookie o del header Authorization - Bearer token
  // const token = req.cookies.jwt_token
  const bearerToken = req.headers.authorization as string

  if (!bearerToken)
    return HttpResponse.Error(res, {
      error: 'INVALID_SESSION',
      status: httpStatus.UNAUTHORIZED,
    })
    
  const token = bearerToken.split(' ')[1]
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET)

    req.user = decoded

    next()
  } catch (err) {
    HttpResponse.Error(res, {
      error: 'INVALID_SESSION',
      status: httpStatus.UNAUTHORIZED,
    })
  }
}
