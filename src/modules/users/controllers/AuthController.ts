import { Request, Response } from 'express';
import AuthUserService from '../services/AuthUserService';

export default class AuthController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUser = new AuthUserService();
    const user = await authUser.execute({ email, password });

    return response.json(user);
  }
}
