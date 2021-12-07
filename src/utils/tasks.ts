import { TaskModel } from "../models"
import { TaskInfo } from "./interfaces";

export const parseTasks = (task: TaskModel): TaskInfo => {
    return {
        id: task.id,
        description: task.description,
        userId: task.user.id,
        createdAt: task.createdAt,
        doneAt: task.doneAt,
    };
};