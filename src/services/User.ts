import { getRepository } from "typeorm";
import { CustomError } from "../utils";
import { UserModel } from "../models";
import { UserInfo } from "../utils/interfaces";

class UserService {
    async register(email: string, password: string): Promise<UserInfo> {
        try {
            const repository = getRepository(UserModel);

            const userExists = await repository.findOne({ where: { email } });

            if(userExists) {
                throw new CustomError(409, 'e-mail already exists.');
            }

            const user = repository.create({email, password});  //Cria uma instancia do model
            await repository.save(user);                        // salva no banco

            return {
                id: user.id,
                email: user.email,
            };
        } catch(e: any) {
            throw new CustomError(500, e);
        }
    }
}

export default new UserService();