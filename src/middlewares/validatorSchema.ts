import { Schema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ErrorExt, HttpResponse, handleError } from "@/utils/http.response.util";

export const validateSchema =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      //Reference err.errors.map((err: any) => err.message)
      if (err instanceof ZodError) {
        const errorMsg = err.errors.map((error) => error.message);
        const error = new ErrorExt(errorMsg, 400);
        handleError.call(res, error);
      } else {
        HttpResponse.Error(res, err);
      }

    }
  };
