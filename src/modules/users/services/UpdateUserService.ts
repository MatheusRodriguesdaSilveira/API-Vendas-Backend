import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  name: string;
  avatarFileName: string;
}

class UpdateUserService {
  public async execute({
    user_id,
    name,
    avatarFileName,
  }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    await usersRepository.update(user_id, {
      name,
      avatar: avatarFileName,
    });

    console.log(avatarFileName);
    return await usersRepository.findOne(user_id);
  }
}

export default UpdateUserService;
