import { Router } from 'express';

import DashboardsController from '../controllers/DashboardsController';

import jwtVerification from '@shared/infra/http/middlewares/ensureAuthenticated';

const dashboardsController = new DashboardsController();

const dashboardRouter = Router();

dashboardRouter.get('/', jwtVerification, dashboardsController.index);

export default dashboardRouter;
