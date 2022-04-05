import { inject, injectable } from "tsyringe";

import { Category } from "@modeles/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { ICarsImageRepository } from "@modeles/cars/repositories/ICarsImageRepository";
import { CarImage } from "@modeles/cars/infra/typeorm/entities/CarImage";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository) { }


    async execute({car_id, images_name}: IRequest): Promise<void> {

        images_name.map(async (image) => {
            const carImage = await this.carsImageRepository.create(car_id, image)
        })

        
    }
}

export { UploadCarImageUseCase }