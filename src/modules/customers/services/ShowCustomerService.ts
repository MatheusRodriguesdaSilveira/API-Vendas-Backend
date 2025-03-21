import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';
import Customers from '../typeorm/entities/Customers';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById( id );

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
