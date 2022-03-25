import { Router } from 'express'
import { CreateCarController } from '@modeles/cars/useCases/createCar/CreateCarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRoutes = Router()

const createCarController = new CreateCarController()
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }