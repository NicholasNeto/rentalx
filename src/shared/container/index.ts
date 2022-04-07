import { container } from 'tsyringe'
import { UserRepository } from '@modeles/accounts/infra/typeorm/repositories/UserRepository'
import { IUsersRepository } from '@modeles/accounts/repositories/IUsersRepository'
import { CategoriesRepository } from '@modeles/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modeles/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modeles/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from '@modeles/cars/repositories/ISpecificationsRepository'
import { ICarsRepository } from '@modeles/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modeles/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImageRepository } from '@modeles/cars/repositories/ICarsImageRepository'
import { CarsImageRepository } from '@modeles/cars/infra/typeorm/repositories/CarsImageRepository'


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository)


container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository", SpecificationsRepository)

container.registerSingleton<IUsersRepository>(
    "UserRepository", UserRepository)

container.registerSingleton<ICarsRepository>(
    "CarsRepository", CarsRepository)

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository", CarsImageRepository)