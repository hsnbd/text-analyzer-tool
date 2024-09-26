import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateConfig } from './core/config/app-config/app-config';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './modules/global-module/global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
