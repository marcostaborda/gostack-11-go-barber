import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const listProviders = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviders.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
