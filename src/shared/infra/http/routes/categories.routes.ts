import multer from 'multer'
import { Router } from 'express'
import { CreateCategoryController } from '@modeles/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modeles/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modeles/cars/useCases/listCategory/ListCategoriesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'


const categoriesRoutes = Router()
const upload = multer({
    dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/import',
    upload.single('file'),
    ensureAuthenticated,
    ensureAdmin,
    importCategoryController.handle
);

export { categoriesRoutes }