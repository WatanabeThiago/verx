import { Router } from 'express';

import PersonsController from '../controllers/PersonsController';
import jwtVerification from '@shared/infra/http/middlewares/ensureAuthenticated';

const personsController = new PersonsController();

const personsRouter = Router();

personsRouter.post('/', jwtVerification, personsController.create);

export default personsRouter;
