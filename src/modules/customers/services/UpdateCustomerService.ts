import { getCustomRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerUpdateEmail = await customerRepository.findByEmail(email);

    if (customerUpdateEmail && email !== customer.email) {
      throw new AppError('There is already one Customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
