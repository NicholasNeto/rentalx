import { Router } from 'express'
import { createSpecificationController } from '../modules/cars/useCases/createSpecification'
import { listCategoriesController } from '../modules/cars/useCases/listCategory'

const specificationsRoutes = Router()


specificationsRoutes.post('/', (request, response) => {

    return createSpecificationController.handle(request, response)



    return response.status(201).send()
})

specificationsRoutes.get('/', (request, response) => {
    listCategoriesController.handle
})

export { specificationsRoutes }

