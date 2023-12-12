import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', usersController.create);
usersRouter.post('/auth', usersController.auth);

export default usersRouter;
