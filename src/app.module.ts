import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateConfig } from './core/config/app-config/app-config';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './modules/global-module/global.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './core/config/sequelize/sequelize-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { TextAnalysisModule } from './modules/text-analysis/text-analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
    }),
    SequelizeModule.forRootAsync({
      imports: [],
      useClass: SequelizeConfigService,
    }),
    GlobalModule,
    AuthModule,
    TextAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
