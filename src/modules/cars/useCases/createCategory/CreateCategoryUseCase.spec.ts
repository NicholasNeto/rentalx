import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category ", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        )
    })

    it('should be able to create a new category', async () => {
        await createCategoryUseCase.execute({
            name: "Category Test",
            description: "Description Category Test"
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName("Category Test")
        expect(categoryCreated).toHaveProperty('id')
        expect(categoryCreated).toMatchObject({name: 'Category Test', description: 'Description Category Test'})

    })

    it('should not be able to create a new category with name exits', async () => {
        expect( async () => {
            await createCategoryUseCase.execute({
                name: "Category Test",
                description: "Description Category Test"
            })
    
            await createCategoryUseCase.execute({
                name: "Category Test",
                description: "Description Category Test"
            })
        }).rejects.toBeInstanceOf(AppError)
    })


})