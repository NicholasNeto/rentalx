import { Router } from 'express'
import multer from 'multer'

import { importCategoryController } from '../modules/cars/useCases/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategory'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'


const categoriesRoutes = Router()


const createCategoryController = new CreateCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response)
})


const upload = multer({
    dest: './tmp',
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response)
});


export { categoriesRoutes }