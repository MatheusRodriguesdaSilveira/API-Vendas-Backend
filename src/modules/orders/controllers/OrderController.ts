import { Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const creteOrder = new CreateOrderService();
    try {
      const order = await creteOrder.execute({ customer_id, products });
      return response.json(order);
    } catch (error) {
      const appError = error as AppError;
      return response
        .status(appError.statusCode)
        .json({ message: appError.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });
    return response.json(order);
  }
}
