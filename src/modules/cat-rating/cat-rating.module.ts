import { Module } from '@nestjs/common';
import { CatRatingService } from './cat-rating.service';
import { CatRatingController } from './cat-rating.controller';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [CatRatingController],
  providers: [CatRatingService]
})
export class CatRatingModule {}
