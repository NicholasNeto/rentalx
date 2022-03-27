import { Router } from 'express'
import { CreateCarController } from '@modeles/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modeles/cars/useCases/listCars/ListCarsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)

export { carsRoutes }