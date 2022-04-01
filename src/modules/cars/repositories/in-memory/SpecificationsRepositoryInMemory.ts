import { Specification } from "@modeles/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
    specification: Specification[] = []

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        Object.assign(specification, {
            description,
            name
        })

        this.specification.push(specification)
        return specification
    }

    async findByName(name: string): Promise<Specification> {
        return this.specification.find((specification) => specification.name === name)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specification.filter(specification => ids.includes(specification.id))
        return allSpecifications
    }

    list(): Promise<Specification[]> {
        return
    }
}

export { SpecificationsRepositoryInMemory }