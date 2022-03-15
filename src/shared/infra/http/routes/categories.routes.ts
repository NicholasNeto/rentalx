import multer from 'multer'
import { Router } from 'express'
import { CreateCategoryController } from '@modeles/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modeles/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modeles/cars/useCases/listCategory/ListCategoriesController'


const categoriesRoutes = Router()
const upload = multer({
    dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new  ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes }