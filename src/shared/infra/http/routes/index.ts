
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import propertiesRouter from '@modules/properties/infra/http/routes/properties.routes';
import personsRouter from '@modules/users/infra/http/routes/persons.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router, Request, Response } from 'express';
import dashboardRouter from 'screens/dashboard/infra/http/routes/dashboard.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
});

routes.use('/v1/persons', personsRouter);
routes.use('/v1/products', productsRouter);
routes.use('/v1/properties', propertiesRouter);
routes.use('/v1/users', usersRouter);
routes.use('/v1/dashboard', dashboardRouter);

export default routes;
