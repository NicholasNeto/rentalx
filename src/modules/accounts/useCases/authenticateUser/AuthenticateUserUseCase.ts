import { compare } from 'bcrypt'
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken' 
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from '@shared/errors/AppError';
interface IRequest {
    email: string;
    password: string;
}


interface IResponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // usuario existe
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new AppError(`Email or password incorrect!`);
            
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError(`Email or password incorrect!`);
        }

        // Gerar jsonwebtoken
        const token = sign({}, "cb7aad368fbbba2f70dffdae85fe1a2e", {
            subject: user.id,
            expiresIn: '1d'
        })


        const tokenReturn: IResponse = {
            token,
            user: {
               name: user.name,
               email: user.email
            }
        }

        return tokenReturn
    }
 
}

export { AuthenticateUserUseCase }