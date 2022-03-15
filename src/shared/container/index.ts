import { container } from 'tsyringe'
import { UserRepository } from '@modeles/accounts/infra/typeorm/repositories/UserRepository'
import { IUsersRepository } from '@modeles/accounts/repositories/IUsersRepository'
import { CategoriesRepository } from '@modeles/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modeles/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modeles/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from '@modeles/cars/repositories/ISpecificationsRepository'


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository)


container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository", SpecificationsRepository)


container.registerSingleton<IUsersRepository>(
    "UserRepository", UserRepository)