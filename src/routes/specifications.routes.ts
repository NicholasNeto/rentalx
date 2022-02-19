import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateSpecificationConroller } from '../modules/cars/useCases/createSpecification/CreateSpecificationConroller'
import { listCategoriesController } from '../modules/cars/useCases/listCategory'

const specificationsRoutes = Router()

const createSpecificationConroller = new CreateSpecificationConroller()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationConroller.handle);

specificationsRoutes.get('/', (request, response) => {
    listCategoriesController.handle
})

export { specificationsRoutes }

