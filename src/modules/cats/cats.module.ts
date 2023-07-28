import { Module, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';
import { CATS_BRANDS } from './cats.contants';
import { ConfigModule } from '@nestjs/config';
import catsConfig from './configs/cats.config';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat, Flavor, Event]),
    ConfigModule.forFeature(catsConfig)
  ],
  controllers: [CatsController],
  providers: [
    CatsService, 
    // {
    //   provide: CATS_BRANDS, 
    //   useFactory: () => [
    //     'pard',
    //     'garfield style'
    //   ]
    // }
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // }
  ],
  exports: [CatsService]
})
export class CatsModule {}
