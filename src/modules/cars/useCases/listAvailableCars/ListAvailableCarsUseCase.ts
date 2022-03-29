import { Car } from "@modeles/cars/infra/typeorm/entities/Car"
import { ICarsRepository } from "@modeles/cars/repositories/ICarsRepository"
import { inject, injectable } from "tsyringe"


interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}


@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        return await this.carsRepository.list(brand, category_id, name)
    }
}

export { ListAvailableCarsUseCase }