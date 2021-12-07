import { getRepository } from "typeorm";
import { CustomError } from "../utils";
import { TaskModel, UserModel } from "../models";
import { TaskInfo, TaskList } from "../utils/interfaces";
import { parseTasks } from "../utils/tasks";

class TaskService {
    
    async create(userId: string, description: string): Promise<TaskInfo> {
        try {
            const taskRepository = getRepository(TaskModel);
            const userRepository = getRepository(UserModel);

            const user = await userRepository.findOne({ where: { id: userId } });

            if(!user) {
                throw new CustomError(404, 'user does not exist.');
            }

            const task = taskRepository.create({ description, user });  //Cria uma instancia do model
            await taskRepository.save(task);                            // salva no banco

            return parseTasks(task);
        } catch(e: any) {
            throw new CustomError(500, e);
        }
    }
    
    async update(userId: string, updatedTask: TaskInfo): Promise<TaskInfo> {
        try {
            const taskRepository = getRepository(TaskModel);

            const task = await taskRepository.findOne({
                relations: ['user'],
                where: {
                    id: updatedTask.id
                }
            });

            if(!task) {
                throw new CustomError(404, 'task does not exist.');
            }

            if(task.user.id !== userId) {
                throw new CustomError(401, 'task does not belong to this user.');
            }
            
            task.description = updatedTask.description;
            if (updatedTask.doneAt) {
                task.doneAt = updatedTask.doneAt;
            }

            await taskRepository.save(task);

            return parseTasks(task);
        } catch(e: any) {
            console.log(e);
            throw new CustomError(500, e);
        }
    }
    
    async delete(userId: string, id: string): Promise<void> {
        try {
            const taskRepository = getRepository(TaskModel);

            const task = await taskRepository.findOne({
                relations: ['user'],
                where: {
                    id
                }
            });

            if(!task) {
                throw new CustomError(404, 'task does not exist.');
            }

            if(task.user.id !== userId) {
                throw new CustomError(401, 'task does not belong to this user.');
            }

            await taskRepository.remove(task);
        } catch(e: any) {
            throw new CustomError(500, e);
        }
    }

    async list(userId: string): Promise<TaskList> {
        try {
            const repository = getRepository(TaskModel);

            const tasks = await repository.findAndCount({
                relations: ['user'],
                where: {
                    user: {
                        id: userId
                    }
                }
            });

            const parsedTasks = tasks[0].map(task => parseTasks(task));

            return {
                tasks: parsedTasks as TaskInfo[],
                count: tasks[1]
            };
        } catch(e: any) {
            console.log(e);
            throw new CustomError(500, e);
        }
    }
}

export default new TaskService();