import { Request, Response } from 'express';
import { CustomError } from '../utils';
import { AuthService } from '../services';

class AuthController {

    async login(req: Request, res: Response) {

        try {
            const { email, password } = req.body;
            
            if (!email || !password || email.trim() === '' || password.trim() === '') {
                res.status(400).json({ message: 'e-mail ou senha invalidos.' });
            }
    
            const result  = await AuthService.login(email, password);
    
            res.status(200).send(result);
        } catch (e: any) {
            if (e instanceof CustomError) {
                res.status(e.codigo).json({ message: e.message });
            } else {
                res.status(500).json({ message: e });
            }
        }
    };

};

export default new AuthController();