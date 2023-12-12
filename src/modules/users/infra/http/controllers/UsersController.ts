import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../services/CreateUserService';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const {
      name,
      email,
      password
    } = req.body;

    const user = await createUserService.execute({
      email,
      name,
      password
    });

    return res.status(201).json(classToClass(user));
  }

  public async auth(req: Request, res: Response): Promise<Response> {
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const {
      email,
      password
    } = req.body;

    const user = await authenticateUserService.execute({
      email,
      password
    });

    return res.status(200).json(classToClass(user));
  }
}
