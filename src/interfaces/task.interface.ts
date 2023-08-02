import { Date, Types } from "mongoose";

export interface Task {
    _id: string;
    title: string;
    description: string;
    date: Date;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}