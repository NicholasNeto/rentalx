import { RentalsRepositoryInMemory } from "@modeles/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
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

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "1212",
            expected_return_date: new Date()
        })

        console.log('rental', rental)

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")

    })

    it("should not be able to create a new rental if there is another open to the same user", () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user",
                car_id: "XXX-CAR-1",
                expected_return_date: new Date()
            })

            await createRentalUseCase.execute({
                user_id: "user",
                car_id: "XXX-CAR-2",
                expected_return_date: new Date()
            })

        }).rejects.toBeInstanceOf(AppError)

    })

    it("should not be able to create a new rental if there is another open to the same car",  () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user-1",
                car_id: "XXX-CAR-1",
                expected_return_date: new Date()
            })

            await createRentalUseCase.execute({
                user_id: "user-2",
                car_id: "XXX-CAR-1",
                expected_return_date: new Date()
            })

        }).rejects.toBeInstanceOf(AppError)

    })

})