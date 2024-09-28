import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AuthService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService],
  exports: [SequelizeModule, AuthService],
})
export class AuthModule {}
