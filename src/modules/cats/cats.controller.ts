import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';

// @UsePipes(ValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

// @UsePipes(ValidationPipe)
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.catsService.findAll(paginationQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const cat = this.catsService.findOne(id)

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
