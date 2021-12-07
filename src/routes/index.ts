import { Router } from "express";
import userRouter from './User';
import authRouter from './Auth';
import taskRouter from "./Task";

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/task', taskRouter);

export default router;