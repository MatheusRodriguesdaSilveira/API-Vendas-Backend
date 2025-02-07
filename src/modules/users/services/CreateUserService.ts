import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    try {
      const usersRepository = getCustomRepository(UserRepository);

      const userExists = await usersRepository.findByEmail(email);

      if (userExists) {
        throw new AppError('Email address already used.');
      }

      const hashedPassword = await hash(password, 8);

      const user = usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await usersRepository.save(user);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default CreateUserService;
