import { Request, Response } from 'express';
import { CustomError } from '../utils';
import { UserService } from '../services';

class UserController {

    async register(req: Request, res: Response) {

        try {
            const { email, password } = req.body;
            
            if (!email || !password || email.trim() === '' || password.trim() === '') {
                res.status(400).json({ message: 'e-mail ou senha invalidos.' });
            }
    
            const result  = await UserService.register(email, password);
    
            res.status(201).send(result);
        } catch (e: any) {
            if (e instanceof CustomError) {
                res.status(e.codigo).json({ message: e.message });
            } else {
                res.status(500).json({ message: e });
            }
        }
    };

};

export default new UserController();