import { ICreateCarDTO } from "@modeles/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modeles/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarRepository implements ICarsRepository{

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car)
    }
    
    async create({
        available,
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
            available,
            category_id,
            daily_rate,
            brand,
            description,
            fine_amount,
            license_plate,
            name
        })

        

        return car
    }

}

export { CarRepository } 