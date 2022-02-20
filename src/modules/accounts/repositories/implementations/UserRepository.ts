import { getRepository, Repository } from "typeorm"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";



import { User } from "../../entities/User";

import { IUsersRepository } from "../IUsersRepository";


class UserRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User)
    }

    async create({
        name,
        email,
        driver_license,
        password,
        id, 
        avatar
    }: ICreateUserDTO): Promise<void> {

        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            id,
            avatar
        })

        await this.repository.save(user)
    };


    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user
    }
    
    async findById(id): Promise<User> {
        const user = await this.repository.findOne(id)
        return user
    }


    // async list(): Promise<Category[]> {
    //     const categories = await this.repository.find()
    //     return categories
    // }

    // async findByName(name: string): Promise<Category> {
    //     const category = await this.repository.findOne({ name })
    //     return category
    // }

}

export { UserRepository }