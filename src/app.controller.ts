import {
  Controller,
  Get,
  Inject,
  Logger,
  LoggerService,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.error('Getting error for testing');
    return this.appService.getHello();
  }

  @Get('/frontend')
  @Render('index')
  getView() {
    return {};
  }
}
