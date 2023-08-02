import { Request, Response, NextFunction } from "express";

/**
 *
 * @param authority Array de roles que pueden acceder a la ruta
 * @returns
 */

const checkRol =
  (roles: Array<String> | String) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const rolByUser = user?.authority || null;

      //Si roles es un string lo convertimos en array
      if (typeof roles === "string") {
        roles = [roles];
      }

      //Comparar si rolByUser esta incluido en roles
      const checkValueRol = roles.includes(rolByUser);

      if (!checkValueRol) {
        res.status(403);
        return res.send("USER_NOT_PERMISSION");
      }
      return next();

    } catch (e) {
      res.status(403);
      return res.send("ERROR_PERMISSION");
    }
  };

export { checkRol };
