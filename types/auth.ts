import { IUser } from "./user";

export type JwtPayload = IUser & {
    exp: number;
    iat: number;
  }