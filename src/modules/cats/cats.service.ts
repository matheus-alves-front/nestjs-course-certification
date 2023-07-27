import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Ban',
      brand: 'I dont know',
      flavors: ['white', 'black', 'gray']
    },
    {
      id: 2,
      name: 'Mia',
      brand: 'I dont know',
      flavors: ['black', 'gray']
    }
  ]

  create(createCatDto: CreateCatDto) {
    const newCat = {
      id: 4,
      ...createCatDto
    }
    this.cats.push(newCat)

    return this.cats;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    return this.cats[id];
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
