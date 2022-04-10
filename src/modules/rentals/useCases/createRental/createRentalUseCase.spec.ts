import { RentalsRepositoryInMemory } from "@modeles/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./createRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {


    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    })

    it("shoul be able to create a new rental", async () => {
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "1212",
            expected_return_date: new Date()
        })
    })
})