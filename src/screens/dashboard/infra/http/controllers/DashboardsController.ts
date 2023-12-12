import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDashboardService from '../../../services/ShowDashboardService';

export default class DashboardsController {
  public async index(req: Request, res: Response): Promise<void> {
    const showDashboardService = container.resolve(ShowDashboardService);

    const dashboard = await showDashboardService.execute({
      userId: req.user.id,
    });

    res.json(dashboard);
  }
}
