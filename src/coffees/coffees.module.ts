// this file is generated with command: nest g module coffees

import { Module, Injectable, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/events/entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      // name of the model
      name: Coffee.name,
      // used to compile the model
      schema: CoffeeSchema
    },
    {
      name: Event.name,
      schema: EventSchema
    }])
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService
  ],
  exports: [CoffeesService]
})
export class CoffeesModule {}
