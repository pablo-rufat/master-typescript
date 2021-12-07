import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../utils/interfaces";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization }= req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.SECRET!);
        const { id } = data as TokenPayload;
        req.userId = id;
        
        next();
    } catch (e) {
        return res.sendStatus(401);
    }
};

export default authMiddleware;