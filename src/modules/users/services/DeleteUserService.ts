import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
}
class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await usersRepository.remove(user);
  }
}
export default DeleteUserService;
