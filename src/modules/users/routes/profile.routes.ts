import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '@config/isAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated)

profileRouter.get('/', profileController.show as any);

profileRouter.put('/', profileController.update as any,);


export default profileRouter;
