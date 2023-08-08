import Permission from "../permissions";

export interface Role {
    _id: string;
    name: string;
    permissions: [keyof typeof Permission];
    users: string[];
    createdAt: Date;
    updatedAt: Date;
}