import jwt from "jsonwebtoken";
import { Payload } from "@/interfaces/jwt.payload.interface";
import { TOKEN_SECRET } from "@/config/env";

export const generateToken = (payload: Payload) => {
  return new Promise((resolve, reject) => {
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
