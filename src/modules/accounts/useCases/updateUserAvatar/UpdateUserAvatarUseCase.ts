import { Response } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";



interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UserRepository")
        private usersRepository: IUsersRepository
    ) { }

    async excute({user_id, avatarFile}: IRequest) : Promise<void>{
        const  user = await this.usersRepository.findById(user_id)
        
        user.avatar = avatarFile
        await this.usersRepository.create(user)
    }

}

export { UpdateUserAvatarUseCase }