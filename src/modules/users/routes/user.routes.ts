import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@config/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userRouter = Router();
const userController = new UsersController();

const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, userController.index as any);
userRouter.post('/', userController.create as any);
userRouter.put(
  '/',
  isAuthenticated,
  upload.single('avatar'),
  userController.update as any,
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  userController.delete as any,
);

export default userRouter;
