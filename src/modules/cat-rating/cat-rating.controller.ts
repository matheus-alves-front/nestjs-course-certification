import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatRatingService } from './cat-rating.service';
import { CreateCatRatingDto } from './dto/create-cat-rating.dto';
import { UpdateCatRatingDto } from './dto/update-cat-rating.dto';

@Controller('cat-rating')
export class CatRatingController {
  constructor(private readonly catRatingService: CatRatingService) {}

  @Post()
  create(@Body() createCatRatingDto: CreateCatRatingDto) {
    return this.catRatingService.create(createCatRatingDto);
  }

  @Get()
  findAll() {
    return this.catRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catRatingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatRatingDto: UpdateCatRatingDto) {
    return this.catRatingService.update(+id, updateCatRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catRatingService.remove(+id);
  }
}
