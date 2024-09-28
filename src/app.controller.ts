import {
  Controller,
  Get,
  Inject,
  Logger,
  LoggerService,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  @SkipThrottle({ default: false })
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
