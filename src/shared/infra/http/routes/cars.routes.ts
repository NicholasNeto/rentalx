import { Router } from 'express'
import { CreateCarController } from '@modeles/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modeles/cars/useCases/listAvailableCars/ListCarsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { CreateCarSpecificationController } from '@modeles/cars/useCases/createCarSpecification/CreateCarSpecificationController'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle)

export { carsRoutes }