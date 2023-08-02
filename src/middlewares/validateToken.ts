import { Request, Response, NextFunction } from "express";
import {
  ErrorExt,
  HttpResponse,
  handleError,
  httpStatus,
} from "../utils/http.response.util";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/env";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Recuperar token de la cookie o del header Authorization
  // const token = req.cookies.jwt_token 
  const token = req.headers.authorization as string;

  if (!token)
    return HttpResponse.Error(res, {
      error: "INVALID_SESSION",
      status: httpStatus.UNAUTHORIZED,
    });

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    if (!decoded)
    return HttpResponse.Error(res, {
      error: "INVALID_TOKEN_SESSION",
      status: httpStatus.UNAUTHORIZED,
    });

    req.user = decoded;

    next();

  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};
