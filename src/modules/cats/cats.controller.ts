import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  
  findAll(@Query() paginationQuery) {
    const {limit, offset} = paginationQuery
    return this.catsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const cat = this.catsService.findOne(id - 1)
    
    if (!cat) throw new NotFoundException('nao encontrado')

    return cat;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
