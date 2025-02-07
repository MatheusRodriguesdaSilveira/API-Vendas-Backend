import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ email });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id);
    return user;
  }
}

export default UserRepository;
