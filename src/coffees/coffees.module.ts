// this file is generated with command: nest g module coffees

import { Module, Injectable, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm'
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// export class MockCoffeesService {}

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe']
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig)
  ],
  controllers: [CoffeesController],
  // a provider is like a module's API
  providers: [
    CoffeesService,
    // {
    //   provide: COFFEE_BRANDS, // String-valued token
    //   useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
    // },
    // alternatively, you can use a Factory Provider instead of useValue:
    // {
    //   provide: COFFEE_BRANDS, // String-valued token
    //   useFactory: () => ['buddy brew', 'nescafe'] // array of coffee brands,
    // },
    // alternatively, you can do this:
    // CoffeeBrandsFactory,
    //  {
    //   provide: COFFEE_BRANDS, // String-valued token
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //     inject: [CoffeeBrandsFactory]
    // },
    // Asynchronous "useFactory" (async provider example)
    // {
      // provide: 'COFFEE_BRANDS',
      // // Note "async" here, and Promise/Async event inside the Factory function
      // // Could be a database connection / API call / etc
      // // In our case we're just "mocking" this type of event with a Promise
      // useFactory: async (connection: Connection): Promise<string[]> => {
      //   // const coffeeBrands = await connection.query('SELECT * ...');
      //   const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
      //   return coffeeBrands;
      // },
      // inject: [Connection],
      // this scope prop can also be passed in an object to the @Injectable decorator in coffees.service, but not in both places
      // scope: Scope.TRANSIENT
    // },
    // example of useClass property:
    // {
    //   provide: ConfigService,
    //   // useClass allows us to dynamically determine a class that a token should resolve to
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  // for value-based custom provider:
  // the value following the provide property is a provider token
  // providers: [{
  //   provide: CoffeesService,
  //   useValue: new MockCoffeesService(), // <-- mock implementation
  // }],
  exports: [CoffeesService]
})
export class CoffeesModule {}
