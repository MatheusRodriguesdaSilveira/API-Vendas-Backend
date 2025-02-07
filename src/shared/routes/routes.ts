import productsRouter from '@modules/products/routes/products.routes';
import authRouter from '@modules/users/routes/auth.routes';
import userRouter from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', authRouter);

export { routes };
