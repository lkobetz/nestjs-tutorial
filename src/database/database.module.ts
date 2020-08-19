import { Module, DynamicModule } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';

// when finished, we import this into the coffee-rating.module

@Module({
  // this code is replaced by the DatabaseModule class below
  // providers: [{
  //   provide: 'CONNECTION',
  //   useValue: createConnection({
  //     type: 'postgres',
  //     host: 'localhost',
  //     port: 5432
  //   })
  // }]
})

// Creating static register() method on DatabaseModule
// export class DatabaseModule {
//   static register(options: ConnectionOptions): DynamicModule {  }
// }

// Improved Dynamic Module way of creating CONNECTION provider
// to achieve customization that other modules can control:
export class DatabaseModule {
  // ConnectionOptions helps strongly type everything we are allowing other modules to pass in (ie db type, host, pw, etc)
  // DynamicModule is like a regular module but requires a module property
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION', // 👈
          useValue: createConnection(options),
        }
      ]
    }
  }
}
