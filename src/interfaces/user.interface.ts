import { Auth } from "./auth.interface";

export enum ROL {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User extends Auth {
  _id: string;
  userName: string;
  fullName: string;
  authority: ROL | [ROL];
  createdAt: Date;
  updatedAt: Date;
}
