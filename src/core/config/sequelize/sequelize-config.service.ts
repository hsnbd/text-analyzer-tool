import { Inject, Injectable } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  @Inject()
  private configService: ConfigService;

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.configService.get<string>('MYSQL_DB_HOST'),
      port: this.configService.get<number>('MYSQL_DB_PORT'),
      username: this.configService.get<string>('MYSQL_DB_USERNAME'),
      password: this.configService.get<string>('MYSQL_DB_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DB_DATABASE'),
      autoLoadModels: true,
      synchronize: true,
      logging: ['LOCAL', 'STAGE'].includes(this.configService.get('APP_ENV'))
        ? console.log
        : false,
    };
  }
}
