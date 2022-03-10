
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it('should be able to authenticate an user', async () => {
        const user : ICreateUserDTO = {
            name: "User Teste",
            password: "1234",
            email: "user@teste.com",
            driver_license: "1313"
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })


    it('should be able not to authenticate an nonexistent user', async () => {
        
        expect( async () => {
            const result = await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: '12345'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})