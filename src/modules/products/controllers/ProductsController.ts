import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import DeleteProductService from '../services/DeleteProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return response.json(products);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });
    return response.json(product);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    return response.json(product);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductService();
    try {
      await deleteProduct.execute({ id });
      return response.json({ message: 'Product deleted successfully' });
    } catch (error) {
      const appError = error as AppError;
      return response.status(appError.statusCode).json({ message: appError.message });
    }
  }

}
