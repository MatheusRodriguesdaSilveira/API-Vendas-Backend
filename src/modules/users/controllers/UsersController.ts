import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import { AppError } from '@shared/errors/AppError';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar || '',
      },
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();
    const users = await listUsers.execute();
    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    // Check if request.file is defined
    if (request.file) {
      const avatarFileName = request.file.filename;
      const updateUser = new UpdateUserService();
      const user = await updateUser.execute({
        user_id: request.user.id,
        avatarFileName,
        name,
      });
      return response.json({
        user: {
          id: user?.id,
          name,
          email: user?.email,
          avatar: user?.avatar,
          created_at: user?.created_at,
          updated_at: user?.updated_at,
        },
      });
    } else {
      // Handle the case when request.file is undefined
      // You can return an error response or handle it in a different way
      return response.status(400).json({ error: 'No file provided' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = new DeleteUserService();
    try {
      await deleteUser.execute({ id });
      return response.json({ message: 'User deleted successfully' });
    } catch (error) {
      const appError = error as AppError;
      return response
        .status(appError.statusCode)
        .json({ message: appError.message });
    }
  }
}
