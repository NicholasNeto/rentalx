import { IRentalRepository } from "@modeles/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}


class CreateRentalUseCase {

    constructor(
        private rentalRepository: IRentalRepository
    ) { }

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<void> {

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

        if (carUnavailable) {
            throw new AppError("Car is unavailable")
        }

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!")
        }


        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date
        })




    }
}

export { CreateRentalUseCase }