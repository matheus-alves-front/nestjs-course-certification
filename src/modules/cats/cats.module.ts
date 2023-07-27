import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';
import { CATS_BRANDS } from './cats.contants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat, Flavor, Event])
  ],
  controllers: [CatsController],
  providers: [CatsService, {
    provide: CATS_BRANDS, 
    useFactory: () => [
      'pard',
      'garfield style'
    ]
  }
  ],
  exports: [CatsService]
})
export class CatsModule {}
