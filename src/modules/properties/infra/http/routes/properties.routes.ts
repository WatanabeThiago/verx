import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';
import jwtVerification from '@shared/infra/http/middlewares/ensureAuthenticated';

const propertiesController = new PropertiesController();

const propertiesRouter = Router();

propertiesRouter.post('/', jwtVerification, propertiesController.create);
propertiesRouter.get('/', jwtVerification, propertiesController.index);

export default propertiesRouter;
