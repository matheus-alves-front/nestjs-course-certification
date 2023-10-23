import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Cat } from './entities/cat.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn()
})

describe('CatsService', () => {
  let service: CatsService;
  let catsRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: DataSource, useValue: {}
        },
        {
          provide: getRepositoryToken(Flavor), useValue: createMockRepository()
        },
        {
          provide: getRepositoryToken(Cat), useValue: createMockRepository()
        }
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catsRepository = module.get<MockRepository>(getRepositoryToken(Cat))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when the cat with id exists', () => {
      it('should return the cat object', async () => {
        const catId = 1
        const expectedCat = {}

        catsRepository.findOne.mockReturnValue(expectedCat)
        const cat = await service.findOne(catId)
        expect(cat).toEqual(expectedCat)
      })
    })

    describe('when the cat dont exist', () => {
      it('should return the cat object', async () => {
        const catId = 1
        const expectedCat = {}

        catsRepository.findOne.mockReturnValue(expectedCat)
        const cat = await service.findOne(catId)
        expect(cat).toEqual(expectedCat)
      })
    })
  })
});
