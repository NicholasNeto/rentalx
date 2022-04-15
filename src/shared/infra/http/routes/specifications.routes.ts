import { Router } from 'express'
import { CreateSpecificationConroller } from '@modeles/cars/useCases/createSpecification/CreateSpecificationConroller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
// import { ListCategoriesController } from '@modeles/cars/useCases/listCategory/ListCategoriesController';

const specificationsRoutes = Router()

const createSpecificationConroller = new CreateSpecificationConroller()

// TODO create list specification 
// specificationsRoutes.get('/', (request, response) => {
//     ListCategoriesController.handle
// })

specificationsRoutes.post('/',
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationConroller.handle
);

export { specificationsRoutes }

