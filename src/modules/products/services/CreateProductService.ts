import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new Error('Product already exists').message;
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return {
      order_products: product.order_products,
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
  }
}
export default CreateProductService;
