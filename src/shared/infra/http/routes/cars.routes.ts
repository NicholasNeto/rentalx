import { Router } from 'express'
import multer from 'multer'

import { CreateCarController } from '@modeles/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modeles/cars/useCases/listAvailableCars/ListCarsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { CreateCarSpecificationController } from '@modeles/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from '@modeles/cars/useCases/uploadCarImage/UploadCarImageController'
import uploadConfig from '../../../../config/upload';




const carsRoutes = Router()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle)


carsRoutes.post(
    "/image/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle)

export { carsRoutes }