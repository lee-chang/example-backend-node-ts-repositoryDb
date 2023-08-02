import { Request, Response } from "express";
import { User } from "@/interfaces/user.interface";
import { authenticationUser, createUser } from "../services/auth.service";
import { Auth } from "@/interfaces/auth.interface";
import {
  ErrorExt,
  HttpResponse,
  handleError,
  httpStatus,
} from "@/utils/http.response.util";
import { callUser, isUserExistWithEmail } from "@/services/user.service";


export const register = async (req: Request, res: Response): Promise<void> => {
  const user: User = req.body;
  try {
    const isExistEmail = await isUserExistWithEmail(user.email);

    if (isExistEmail)
      throw new ErrorExt("EMAIL_ALREADY_EXIST", httpStatus.BAD_REQUEST);

    if (!user.userName || !user.email || !user.password)
      throw new ErrorExt("DATA_NOT_FOUND", httpStatus.BAD_REQUEST);

    const newUser = await createUser(user);
    if (!newUser)
      throw new ErrorExt("USER_NOT_CREATED", httpStatus.BAD_REQUEST);

    const data = {
      user: {
        id: newUser.user._id,
        userName: newUser.user.userName,
        email: newUser.user.email,
        updatedAt: newUser.user.updatedAt,
        createdAt: newUser.user.createdAt,
      },
      token: newUser.token,
    };

    HttpResponse.OkCookieAuth(res, data, newUser.token);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const user: Auth = req.body;

  if (!user.email || !user.password)
    throw new ErrorExt("DATA_NOT_FOUND", httpStatus.BAD_REQUEST);

  try {
    const loginUser = await authenticationUser(user);
    if (!loginUser)
      throw new ErrorExt("USER_NOT_LOGIN", httpStatus.BAD_REQUEST);

    const { user: userLogged, token } = loginUser;

    const data = {
      user: {
        id: userLogged._id,
        userName: userLogged.userName,
        email: userLogged.email,
        authority: userLogged.authority,
      },
      token: token,
    };

    HttpResponse.OkCookieAuth(res, data, token);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    HttpResponse.OkCookieAuth(res, {}, "");
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userFound = await callUser(req.user.id);
    if (!userFound)
      throw new ErrorExt("USER_NOT_FOUND", httpStatus.BAD_REQUEST);
    const data = {
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
      authority: userFound.authority,
    };
    HttpResponse.Ok(res, { user: data });
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};