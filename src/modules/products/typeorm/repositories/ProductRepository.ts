import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindRequest {
  id: string;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      name,
    });

    return product;
  }

  public async findAllByIds(products: IFindRequest[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}

export default ProductRepository;
