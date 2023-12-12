import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePersonService from '../../../services/CreatePersonService';

export default class PersonsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createPersonService = container.resolve(CreatePersonService);

    const {
      name,
      nationalDocument,
    } = req.body;

    const person = await createPersonService.execute({
      name,
      nationalDocument
    });

    return res.status(201).json(classToClass(person));
  }

}
