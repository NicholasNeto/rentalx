import { User } from "@modeles/accounts/infra/typeorm/entities/User";
import { Car } from "@modeles/cars/infra/typeorm/entities/Car";
import { ICreateRentalDTO } from "../dtos/ICreateRental";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalRepository {

    create(data: ICreateRentalDTO): Promise<Rental>
    findOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
}

export { IRentalRepository }
