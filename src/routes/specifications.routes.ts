import { Router } from 'express'
import { CreateSpecificationConroller } from '../modules/cars/useCases/createSpecification/CreateSpecificationConroller'
import { listCategoriesController } from '../modules/cars/useCases/listCategory'

const specificationsRoutes = Router()

const createSpecificationConroller = new CreateSpecificationConroller()

specificationsRoutes.post('/', createSpecificationConroller.handle);

specificationsRoutes.get('/', (request, response) => {
    listCategoriesController.handle
})

export { specificationsRoutes }

