import { Router } from 'express'
import { CreateSpecificationConroller } from '@modeles/cars/useCases/createSpecification/CreateSpecificationConroller';
import { listCategoriesController } from '@modeles/cars/useCases/listCategory';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router()

const createSpecificationConroller = new CreateSpecificationConroller()

specificationsRoutes.get('/', (request, response) => {
    listCategoriesController.handle
})

specificationsRoutes.post('/',
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationConroller.handle
);

export { specificationsRoutes }

