import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity/event.entity';
import { CATS_BRANDS } from './cats.contants';
import { ConfigService, ConfigType } from '@nestjs/config';
import catsConfig from './configs/cats.config';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    // private readonly connection: Connection,
    // @Inject(CATS_BRANDS) catsBrands: string[],
    // @Inject(catsConfig.KEY)
    // private readonly catsConfiguration: ConfigType<typeof catsConfig>
  ) {
    // const catsConfig = this.catsConfiguration
    // console.log(catsConfig)
  }

  async create(createCatDto: CreateCatDto) {
    const flavors = await Promise.all(
      createCatDto.flavors.map(name => this.preloadFlavorByName(name))
    );

    const newCat = this.catsRepository.create({
      ...createCatDto,
      flavors
    });

    return await this.catsRepository.save(newCat);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const {limit, offset} = paginationQuery

    return this.catsRepository.find({
      relations: {
        flavors: true
      },
      skip: offset,
      take: limit
    });
  }

  async findOne(id: number) {
    const cat = await this.catsRepository.findOne({
      where: {
        id
      },
      relations: {
        flavors: true
      }
    })

    if (!cat) throw new NotFoundException(`${id} not found`)

    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const flavors = updateCatDto.flavors &&  (await Promise.all(
      updateCatDto.flavors.map(name => this.preloadFlavorByName(name))
    ))

    const catToUpdate = await this.catsRepository.preload({
      id,
      ...updateCatDto,
      flavors
    })

    if (!catToUpdate) throw new NotFoundException(`${id} not found`)

    return this.catsRepository.save(catToUpdate)

  }

  async remove(id: number) {
    const catToDelete = await this.findOne(id)

    return await this.catsRepository.remove(catToDelete);
  }

  async recommendCat(cat: Cat) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    console.log(queryRunner)

    try {
      cat.recommendations++

      const recommendEvent = new Event()

      recommendEvent.name = 'recommend_cat'
      recommendEvent.type = 'cat'
      recommendEvent.payload = { catId: cat.id } 

      await queryRunner.manager.save(cat)
      await queryRunner.manager.save(recommendEvent)

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {
        name
      }
    })

    if (existingFlavor) {
      return existingFlavor
    }

    return this.flavorRepository.create({ name })
  }
}
