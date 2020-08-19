import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config'

// this is a decorator (a function that applies logic) applied to a class
// it encapsulates everything that's important to this module's context
@Module({
  imports: [
    // ConfigModule merges .env files with vars in process.env to be accessed via a ConfigService class
    ConfigModule.forRoot({
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      // }),
      load: [appConfig]
    }),
    CoffeesModule,
    // if you want to import this before loading the appConfig (which defines env vars), use forRootAsync and wrap body in useFactory: () => ({})
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    // synchronize configuration lets TypeOrm automatically generate a SQL table from all classes with the @Entity decorator and the metadata they contain
    // synchronize false for production
    synchronize: true
  }), CoffeeRatingModule, DatabaseModule, CommonModule],
  // controllers tie incoming requests to 'paths' designated by the controller or its Http methods
  controllers: [AppController],
  // each service is a provider. Providers can inject dependencies, so objects can create various relationships to each other and the logic of wiring up instances of objects together can all be handled by the Nest runtime system
  providers: [AppService],
})
export class AppModule {}
