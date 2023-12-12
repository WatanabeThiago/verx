import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatePropertyService from '@modules/properties/services/CreatePropertyService';
import IndexPropertiesService from '@modules/properties/services/IndexPropertiesService';

export default class PropertiessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createPropertyService = container.resolve(CreatePropertyService);

    const { agriculturalArea,
      address,
      name,
      totalArea,
      vegetationArea,
      person,
      products } = req.body;

    const properties = await createPropertyService.execute({
      userId: req.user.id,
      agriculturalArea,
      address,
      name,
      totalArea,
      vegetationArea,
      person,
      products
    });

    return res.status(201).json(classToClass(properties));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const indexPropertiesService = container.resolve(IndexPropertiesService);

    const properties = await indexPropertiesService.execute({
      person: {
        nationalDocument: req.query.nationalDocument ? String(req.query.nationalDocument) : undefined
      },
      products: {
        productId: req.query.productId ? Number(req.query.productId) : undefined
      },
      city: req.query.city ? String(req.query.city) : undefined,
      country: req.query.country ? String(req.query.country) : undefined,
      state: req.query.state ? String(req.query.state) : undefined,
    });

    return res.status(201).json(classToClass(properties));
  }
}
