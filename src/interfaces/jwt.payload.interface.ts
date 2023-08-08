import { Types } from "mongoose";

export interface Payload {
    id: string
    authority: string[]
    rememberMe?: Boolean
}

