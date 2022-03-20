import { ICreateCarDTO } from "@modeles/cars/dtos/ICreateCarDTO";
import { Car } from "@modeles/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = []

    async create({
        category_id,
        daily_rate,
        brand,
        description,
        fine_amount,
        license_plate,
        name
    }: ICreateCarDTO): Promise<Car> {

        const car = new Car()

        Object.assign(car, {
            category_id,
            daily_rate,
            brand,
            description,
            fine_amount,
            license_plate,
            name
        })

        this.cars.push(car)
        return car 

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.cars.find(car => car.license_plate === license_plate)
    }
}


export { CarsRepositoryInMemory } 