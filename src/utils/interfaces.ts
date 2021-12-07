import { TaskModel } from "../models";

export interface UserInfo {
    id: string;
    email: string;
};

export interface LoginResponse {
    user: UserInfo;
    token: string;
}

export interface TaskInfo {
    id: string;
    description: string;
    userId: string;
    createdAt: Date;
    doneAt: Date | null;
};

export interface TaskList {
    tasks: TaskInfo[];
    count: number
};

export interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
};