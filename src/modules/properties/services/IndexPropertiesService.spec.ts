
import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import IndexPropertiesService from './IndexPropertiesService';

let fakePropertiesRepository: FakePropertiesRepository;

let indexPropertiesService: IndexPropertiesService;

describe('IndexPropertiesService', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();

    indexPropertiesService = new IndexPropertiesService(fakePropertiesRepository);
  });

  it('1. Should be able to index properties', async () => {
    const properties = await indexPropertiesService.execute({
      person: {
        nationalDocument: "59311754072"
      },
      products: {
        productId: 1
      },
      city: "Campo Grande",
      country: "BR",
      state: "MS",
    });

    expect(properties).toBeInstanceOf(Array);
  });
});
