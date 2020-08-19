/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// this file is generated with command: nest g co

import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res, Patch, Delete, Query, SetMetadata } from '@nestjs/common';
import { CoffeesService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ApiResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags() groups all routes together under 'coffees' in swagger ui (separate from default)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  // private allows us to declare and initialize CoffeeService immediately, also makes it only available within this class
  // readonly prevents us from modifying the service reference from within this class
  // coffeesService arg tells Nest to inject CoffeesService as a Provider
  constructor(private readonly coffeesService: CoffeesService) {
  }
  // @ApiForbiddenResponse({ description: 'Forbidden' })
  // @Get is a decorator. Decorators attach different http mthods to our controller
  // 'flavors' creates a nested route, so the route becomes coffees/flavors
  // without it, the route is just 'coffees'
  // @Get('flavors')
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }
  // simpler example:
  @Public()
  @Get()
  // 'findAll' in the following line is an arbitrary name, but it helps to give it the same name as the service method it calls (this.coffeeService.findAll)
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  // without specifying type of id, we could just pass 'params' and then deconstruct 'params.id' in return statement
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id)
    // return `This action returns #${id} coffee`;
  }

  @Post()
  // custom Http code, not advised
  // @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto)
  }

  // a patch request updates a resource 'partially'
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto)
    // return `This action updates ${id} coffee`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id)
    // return `This action removes ${id} coffee`
  }
}
