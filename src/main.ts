import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import winstonLogger from './core/libs/winston/winston-logger';
import { AllExceptionFilter } from './core/filters/all-exception.filter';
import { validationPipeFactory } from './core/config/validation/config';
import { swaggerFactory } from './core/libs/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });

  app.useGlobalPipes(validationPipeFactory());
  app.useGlobalFilters(new AllExceptionFilter());
  swaggerFactory(app).catch(console.log);

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT'));

  console.log(`App running on ${await app.getUrl()}`);
}

bootstrap();
