import { User } from './entities/user.interface';

export interface Auth {
    email: string;
    password: string;
    rememberMe?: boolean
}