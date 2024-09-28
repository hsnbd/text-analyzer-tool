import { Global, Logger, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  providers: [Logger],
  exports: [Logger, AuthModule],
})
export class GlobalModule {}
