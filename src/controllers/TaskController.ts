import { Request, Response } from 'express';
import { CustomError } from '../utils';
import { TaskService } from '../services';

class TaskController {

    async list(req: Request, res: Response) {
        try {
            const { userId } = req;

            const result  = await TaskService.list(userId);
    
            res.status(200).send(result);
        } catch (e: any) {
            if (e instanceof CustomError) {
                res.status(e.codigo).json({ message: e.message });
            } else {
                res.status(500).json({ message: e });
            }
        }
    };

    async create(req: Request, res: Response) {
        try {
            const { userId } = req;
            const { description } = req.body;

            const result  = await TaskService.create(userId, description);
    
            res.status(201).send(result);
            
        } catch (e: any) {
            if (e instanceof CustomError) {
                res.status(e.codigo).json({ message: e.message });
            } else {
                res.status(500).json({ message: e });
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { userId } = req;
            const { updatedTask } = req.body;
            const { id } = req.params;

            updatedTask.id = id;

            const result  = await TaskService.update(userId, updatedTask);
    
            res.status(200).send(result);
            
        } catch (e: any) {
            if (e instanceof CustomError) {
                res.status(e.codigo).json({ message: e.message });
            } else {
                res.status(500).json({ message: e });
            }
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { userId } = req;
            const { id } = req.params;

            await TaskService.delete(userId, id);
    
            res.status(200).json({ message: 'task deleted.' });
            
        } catch (e: any) {
            if (e instanceof CustomError) {
                res.status(e.codigo).json({ message: e.message });
            } else {
                res.status(500).json({ message: e });
            }
        }
    }

};

export default new TaskController();