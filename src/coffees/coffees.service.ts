/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// this file is generated with command: nest g s

import { Injectable, HttpException, HttpStatus, NotFoundException, Inject, Scope, Request } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants'
import { REQUEST } from '@nestjs/core'
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from './config/coffees.config'

// @Injectable decorator marks the CoffeesService class as a Provider
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    // used for transactions:
    private readonly connection: Connection,
    // single argument to @Inject decorator is token that needs to be looked up
    // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    // @Inject(REQUEST) private request: Request, // injects the original request object if you need headers, cookies, IP addresses, etc. Note that request-scoped providers may have an impact on application performance because it has to create an instance for each request
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
    private readonly configService: ConfigService,
  ) {
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      // relations property is for eager loading associated tables
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors']
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found!`)
    } else return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
    )
    // 'create' method creates a Coffee class instance
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    // 'save' method returns a promise, saves new entity to database
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors &&
    (await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
    ));
    // preload creates a new entity based on object passed in, first looks for preexisting entity and replaces all its values with new values passed in here. Will return undefined if id doesn't exist in db
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found!`)
    }
    return this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id }

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({name});
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({name})
  }
}
