import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.auth as any,
);

export default authRouter;
