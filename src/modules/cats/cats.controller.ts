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
  ValidationPipe, 
  SetMetadata
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';

// @UsePipes(ValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

// @UsePipes(ValidationPipe)
  // @SetMetadata('isPublic', true)
  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string, 
    @Query() paginationQuery: PaginationQueryDto
  ) {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    console.log(protocol)
    return this.catsService.findAll(paginationQuery)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
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
