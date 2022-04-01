import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "@modeles/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modeles/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({
        category_id,
        daily_rate,
        brand,
        description,
        fine_amount,
        license_plate,
        name,
        specifications
    }: ICreateCarDTO): Promise<Car> {

        const car = this.repository.create({
            category_id,
            daily_rate,
            brand,
            description,
            fine_amount,
            license_plate,
            name
        })

        await this.repository.save(car)
        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        })

        return car
    }

    async list(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("cars")
            .where("available = :available", { available: true })

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand })
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name })
        }
        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id })
        }

        const cars = carsQuery.getMany()
        return cars
    }


    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id)
        return car;
    }
}

export { CarsRepository } 