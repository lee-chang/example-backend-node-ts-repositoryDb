import { Date, Types } from "mongoose";

export interface Task {
    _id: string;
    title: string;
    description: string;
    date: Date;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}