import { ISpecificationRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository){}
  execute({ name, description}){


    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error(`Category ${name} already exists`);
    }


    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };