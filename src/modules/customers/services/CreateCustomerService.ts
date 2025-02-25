import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
}
class CreateCustomersService {

    public async execute({ name, email }: IRequest): Promise<Customers> {
      try {
        const customersRepository = getCustomRepository(CustomersRepository);

        const userExists = await customersRepository.findByEmail(email);

        if (userExists) {
          throw new AppError('Email address already used.');
        }

        const customer = customersRepository.create({
          name,
          email,
        });

        await customersRepository.save(customer);

        return customer;
      } catch (error) {
        throw error;
      }
    }
  }

export default CreateCustomersService;
