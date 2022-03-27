import { Car } from "@modeles/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modeles/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(async () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create(
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 1",
                category_id: "category"
            }
        )
        const cars = await listCarsUseCase.execute({})

        expect(cars).toHaveLength(1)
        expect(cars[0]).toBeInstanceOf(Car)
        expect(cars[0]).toEqual(car)
    })

    it("should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create(
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 1",
                category_id: "category"
            }
        )

        const car2 = await carsRepositoryInMemory.create(
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 2",
                category_id: "category"
            }
        )
        const cars = await listCarsUseCase.execute({ brand: "Brand Car 1" } )

        expect(cars).toHaveLength(1)
        expect(cars[0]).toBeInstanceOf(Car)
        expect(cars[0]).toEqual(car)
    })


    it("should be able to list all available cars by category_id", async () => {

        const car = await carsRepositoryInMemory.create(
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 1",
                category_id: "SUV-xxxx"
            }
        )

        const car2 = await carsRepositoryInMemory.create(
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 2",
                category_id: "Sedan"
            }
        )
        const cars = await listCarsUseCase.execute({ category_id: "SUV-xxxx" } )

        expect(cars).toHaveLength(1)
        expect(cars[0]).toBeInstanceOf(Car)
        expect(cars[0]).toEqual(car)
    })

    it("should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create(
            {
                name: "HR-V",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 1",
                category_id: "SUV-xxxx"
            }
        )

        const car2 = await carsRepositoryInMemory.create(
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand Car 2",
                category_id: "Sedan"
            }
        )
        const cars = await listCarsUseCase.execute({ name: "HR-V" } )

        expect(cars).toHaveLength(1)
        expect(cars[0]).toBeInstanceOf(Car)
        expect(cars[0]).toEqual(car)
    })
})