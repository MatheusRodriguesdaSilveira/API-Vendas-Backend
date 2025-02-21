import { Request, Response } from 'express';
import { z } from 'zod';
import UpdateProfileService from '../services/UpdateProfileService';
import ShowProfileService from '../services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // Esquema de validação com Zod
    const schema = z.object({
      name: z.string().min(3, 'Name must have at least 3 characters'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must have at least 6 characters').optional().or(z.literal('')),
      password_confirmation: z.string().min(6, 'Password must have at least 6 characters').optional().or(z.literal('')),
      old_password: z.string().optional(),
    }).refine((data) => {
      if (data.password && !data.old_password) {
        return false;
      }
      return true;
    }, {
      message: 'Old password is required when changing password',
      path: ['old_password'],
    }).refine((data) => {
      if (data.password && data.password !== data.password_confirmation) {
        return false;
      }
      return true;
    }, {
      message: 'Password confirmation does not match',
      path: ['password_confirmation'],
    });

    try {
      // Validação do corpo da requisição
      const validatedData = schema.parse(request.body);

      const user_id = request.user.id;
      const { name, email, password, old_password } = validatedData;

      const updateProfile = new UpdateProfileService();
      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      });

      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ errors: error.errors });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
