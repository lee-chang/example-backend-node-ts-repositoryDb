import { Types } from "mongoose";
import { ROL } from "./user.interface";

export interface Payload {
    id: string | Types.ObjectId;
    authority: ROL | [ROL];
    rememberMe?: Boolean
}

