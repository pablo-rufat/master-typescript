import { Router } from "express";
import { TaskController } from '../controllers';
import { authMiddleware } from "../middlewares";

const taskRouter = Router();

taskRouter.get('/', authMiddleware, TaskController.list);
taskRouter.post('/', authMiddleware, TaskController.create);
taskRouter.put('/:id', authMiddleware, TaskController.update);
taskRouter.delete('/:id', authMiddleware, TaskController.delete);

export default taskRouter;