import { User } from './user.interface';

export interface Auth {
    email: string;
    password: string;
    rememberMe?: boolean
}