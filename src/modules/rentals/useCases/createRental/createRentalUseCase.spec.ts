import dayjs from 'dayjs'
import { RentalsRepositoryInMemory } from "@modeles/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./createRentalUseCase"
import { DateProvider } from '@shared/container/providers/DateProvider/implementations/DateProvider'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DateProvider


describe("Create Rental", () => {

    const DAY_ADD_24_HOURS = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory
        dayjsDateProvider = new DateProvider()
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        );
    })

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "1212",
            expected_return_date: DAY_ADD_24_HOURS
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")

    })

    it("should not be able to create a new rental if there is another open to the same user", () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user",
                car_id: "XXX-CAR-1",
                expected_return_date: DAY_ADD_24_HOURS
            })

            await createRentalUseCase.execute({
                user_id: "user",
                car_id: "XXX-CAR-2",
                expected_return_date: DAY_ADD_24_HOURS
            })

        }).rejects.toBeInstanceOf(AppError)

    })

    it("should not be able to create a new rental if there is another open to the same car", () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user-1",
                car_id: "XXX-CAR-1",
                expected_return_date: DAY_ADD_24_HOURS
            })

            await createRentalUseCase.execute({
                user_id: "user-2",
                car_id: "XXX-CAR-1",
                expected_return_date: DAY_ADD_24_HOURS
            })

        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to create a new rental if invalid return time", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user-1",
                car_id: "XXX-CAR-1",
                expected_return_date: dayjs().toDate()
            })

        }).rejects.toBeInstanceOf(AppError)
    })

})