import { Car } from "@modeles/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modeles/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("shold be able to create a new car", async () => {
        const carCreated = await createCarUseCase.execute(
            {
                name: "Name Car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand Car",
                category_id: "category"
            }
        )

        expect(carCreated).toHaveProperty('id')

    })

    it("shold not be able to create a car with exists licenseplate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-12345",
                fine_amount: 60,
                brand: "Brand Car",
                category_id: "category"
            })

            await createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-12345",
                fine_amount: 60,
                brand: "Brand Car",
                category_id: "category"
            })

        }).rejects.toBeInstanceOf(AppError)
    })

    it("shold be able to create a car with available true", async () => {

        const car = await createCarUseCase.execute({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 60,
            brand: "Brand Car",
            category_id: "category"
        })

        expect(car.available).toEqual(true)
    })
})