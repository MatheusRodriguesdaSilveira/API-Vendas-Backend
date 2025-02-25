import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import ListCustomersService from '../services/ListCustomersService';
import CreateCustomersService from '../services/CreateCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers= new ListCustomersService();
    const customers = await listCustomers.execute();
    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = new CreateCustomersService();
    try {
      const customer = await createCustomer.execute({ name, email });
      return response.json(customer);
    } catch (error) {
      const appError = error as AppError;
      return response.status(appError.statusCode).json({ message: appError.message });
    }

  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const updateCustomer = new UpdateCustomerService();
    try {
      const customer = await updateCustomer.execute({ name, email, id });
      return response.json(customer);
    } catch (error) {
      const appError = error as AppError;
      return response.status(appError.statusCode).json({ message: appError.message });
    }

  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    const customer = await deleteCustomer.execute({ id });

    return response.json(customer);
  }
}
