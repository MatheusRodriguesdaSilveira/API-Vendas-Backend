import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const userExists = await usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const { token } = await userTokensRepository.generate(userExists.id);

    // console.log(token);

    await EtherealMail.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: userExists.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
