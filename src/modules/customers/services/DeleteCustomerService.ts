import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepository.remove(customer);

  }
}

export default DeleteCustomerService
