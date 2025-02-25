import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@config/isAuthenticated';

const customersRouter = Router();

const customersController = new CustomersController();

customersRouter.use(isAuthenticated)

customersRouter.get('/', customersController.index as any);

customersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),  customersController.show as any);

customersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),  customersController.delete as any);

customersRouter.post('/' ,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create as any
);

customersRouter.put('/:id' ,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customersController.update as any
);




export default customersRouter;
