import { PartialType } from '@nestjs/mapped-types';
import { CreateCatRatingDto } from './create-cat-rating.dto';

export class UpdateCatRatingDto extends PartialType(CreateCatRatingDto) {}
