import { Specification } from "@modeles/cars/infra/typeorm/entities/Specification";
import { SpecificationsRepository } from "@modeles/cars/infra/typeorm/repositories/SpecificationsRepository";
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

    async execute({car_id, specifications_id}: IRequest): Promise<void>{

        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        )

        carExists.specifications = specifications

        await this.carsRepository.create(carExists)



    }
}



export {  CreateCarSpecificationUseCase }
