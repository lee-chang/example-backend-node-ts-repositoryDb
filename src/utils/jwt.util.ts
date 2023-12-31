import jwt from "jsonwebtoken";
import { Payload } from "@/interfaces/jwt.payload.interface";
import { TOKEN_SECRET } from "@/config/env";
import { roleNameById } from "@/services/role.service";

export const generateToken = (payload: Payload) => {
  return new Promise<string | undefined>((resolve, reject) => {

    // ** Checkboxes rememberMe
    const expiresIn = payload.rememberMe ? "30d" : "1d";

    jwt.sign(
      { id: payload.id, authority: payload.authority },
      TOKEN_SECRET,
      { expiresIn: expiresIn },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
