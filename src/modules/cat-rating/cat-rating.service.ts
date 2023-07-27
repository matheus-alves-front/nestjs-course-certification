import { Injectable } from '@nestjs/common';
import { CreateCatRatingDto } from './dto/create-cat-rating.dto';
import { UpdateCatRatingDto } from './dto/update-cat-rating.dto';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class CatRatingService {
  constructor(private readonly catsService: CatsService) {}

  create(createCatRatingDto: CreateCatRatingDto) {
    return 'This action adds a new catRating';
  }

  findAll() {
    return `This action returns all catRating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catRating`;
  }

  update(id: number, updateCatRatingDto: UpdateCatRatingDto) {
    return `This action updates a #${id} catRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} catRating`;
  }
}
