import { Router } from 'express'
import { CreateSpecificationConroller } from '@modeles/cars/useCases/createSpecification/CreateSpecificationConroller';
import { listCategoriesController } from '@modeles/cars/useCases/listCategory';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router()

const createSpecificationConroller = new CreateSpecificationConroller()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationConroller.handle);

specificationsRoutes.get('/', (request, response) => {
    listCategoriesController.handle
})

export { specificationsRoutes }

