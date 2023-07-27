import { Test, TestingModule } from '@nestjs/testing';
import { CatRatingController } from './cat-rating.controller';
import { CatRatingService } from './cat-rating.service';

describe('CatRatingController', () => {
  let controller: CatRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatRatingController],
      providers: [CatRatingService],
    }).compile();

    controller = module.get<CatRatingController>(CatRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
