import { AppError } from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entities/User';

interface AuthRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({ email, password }: AuthRequest): Promise<IResponse> {
      const usersRepository = getCustomRepository(UserRepository);

      const user = await usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Senha ou email não encontrado ou incorreto');
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError('Senha ou email não encontrado ou incorreto');
      }

      if (
        !process.env.JWT_SECRET ||
        typeof process.env.JWT_SECRET !== 'string'
      ) {
        throw new AppError('JWT_SECRET inválido');
      }

      const token = sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: '1d',
        },
      );

      return {
        user,
        token,
      };
  }
}

export default AuthUserService;
