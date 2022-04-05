import { Car } from "@modeles/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modeles/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modeles/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    car_id: string;
    specifications_id: string[];
}


// @injectable()
class CreateCarSpecificationUseCase {

    constructor(
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        private specificationsRepository: ISpecificationRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<Car>{

        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        )

        carExists.specifications = specifications

        await this.carsRepository.create(carExists)

        return carExists

    }
}



export {  CreateCarSpecificationUseCase }
