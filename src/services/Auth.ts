import { getRepository } from "typeorm";
import { CustomError } from "../utils";
import { UserModel } from "../models";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginResponse } from "../utils/interfaces";

class AuthService {

    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const repository = getRepository(UserModel);

            const user = await repository.findOne({ where: { email } });

            if(!user) {
                throw new CustomError(404, 'user not found.');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new CustomError(401, 'Invalid password.');
            }

            const token = jwt.sign({ id: user.id }, process.env.SECRET!, { expiresIn: '1d' });

            return {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token
            };

        } catch(e: any) {
            throw new CustomError(500, e);
        }
    }
}

export default new AuthService();