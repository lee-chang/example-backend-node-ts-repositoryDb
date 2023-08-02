import { Response } from "express";
import { NAME_STORAGE_TOKEN_JWT } from "../config/env";

export enum httpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class ErrorExt extends Error {
  status: number;
  error: string | string[] | "";

  constructor(message: string | string[], status: httpStatus) {
    super(httpStatus[status]);
    this.status = status;
    this.error = message;
  }
}

export class handleError {
  static call(res: Response, data: ErrorExt) {
    return res.status(data.status).json({
      message: `${data.error}`,
      error: httpStatus[data.status]
    });
  }
}

export class HttpResponse {
  static Error(res: Response, data: any | { status: number; error: any }) {
    return res.status(data.status).json({
      message: `${data.error}`,
      error: httpStatus[data.status]
    });
  }

  static Ok(res: Response, data: any) {
    return res.status(httpStatus.OK).json(data);
  }

  //for cookie
  static OkCookieAuth(res: Response, data: any, token: any) {
    //si token es ""
    if (token === "") {
      return res.status(httpStatus.OK).clearCookie(`${NAME_STORAGE_TOKEN_JWT}`).json(data);
    }
    return res.status(httpStatus.OK).cookie(`${NAME_STORAGE_TOKEN_JWT}`, token).json(data);
  }
}
