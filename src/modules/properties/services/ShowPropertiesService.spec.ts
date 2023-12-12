
import AppError from '@shared/errors/AppError';
import Property from '../infra/typeorm/entities/Property';
import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import fakeProperty from '../repositories/fakes/seeds/fakeProperty';
import ShowPropertyService from './ShowPropertyService';

let fakePropertiesRepository: FakePropertiesRepository;

let showPropertiesService: ShowPropertyService;

describe('ShowPropertyService', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();

    showPropertiesService = new ShowPropertyService(fakePropertiesRepository);
  });

  it('1. Should be able to find properties', async () => {
    const properties = await showPropertiesService.execute(fakeProperty.id);

    expect(properties).toBeInstanceOf(Property);
  });

  it('2. Should throw 404 when not found', async () => {
    expect(showPropertiesService.execute('invalid')).rejects.toBeInstanceOf(AppError);
  });
});
