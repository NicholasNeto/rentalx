import { Rental } from "@modeles/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modeles/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}


class CreateRentalUseCase {

    constructor(
        private rentalRepository: IRentalRepository,
        private dateProvider: IDateProvider

    ) { }

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const MINIMUM_HOUR = 24

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

        if (carUnavailable) {
            throw new AppError("Car is unavailable")
        }

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!")
        }

        const dateNow = this.dateProvider.dateNow()

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        )
        
        if (compare < MINIMUM_HOUR) {
            throw new AppError("Invalid return time!")
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date
        })


        return rental

    }
}

export { CreateRentalUseCase }