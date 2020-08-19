import { NestFactory } from '@nestjs/core';
// App Module is root module containing everything app needs to run
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // pipes can also be used in individual controllers with decorator @UsePipes(). Also @UseInterceptors, @UseGuards, and @UseFilters
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          // no longer have to explicitly specify types with @Type decorator
          enableImplicitConversion: true
        }
      })
    )
    // app.useGlobalFilters(new HttpExceptionFilter());
    // app.useGlobalInterceptors(
    //   new WrapResponseInterceptor(),
    //   new TimeoutInterceptor(), // 👈
    // );

    const options = new DocumentBuilder()
      .setTitle('Iluvcoffee')
      .setDescription('Coffee application')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
        await app.listen(3000);
}
bootstrap();
