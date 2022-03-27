import { Car } from "@modeles/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modeles/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase;
let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
    
    beforeEach(async () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)

        await createCarUseCase.execute({
            name: "Name Car1",
            description: "Description Car1",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand Car 1",
            category_id: "category"
        })

        await createCarUseCase.execute({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "DEF-123",
            fine_amount: 50,
            brand: "Brand Car 2",
            category_id: "category"
        })
    })

    it("should be able to list all available cars", async () => {
        const cars = await listCarsUseCase.execute()

        expect(cars).toHaveLength(2)
        expect(cars[0]).toBeInstanceOf(Car)
    })
})