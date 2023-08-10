import { KeyPermissions } from "../permissions";

export interface Role {
    _id: string;
    name: string;
    permissions: [KeyPermissions];
    users: string[];
    createdAt: Date;
    updatedAt: Date;
}