import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { IAuthUser } from '../../core/interfaces/auth-user';

@Injectable()
export class AuthService {
  @InjectModel(User)
  private userModel: typeof User;

  async getAuthUserFromJwtPayload(jwtPayload: any): Promise<IAuthUser | null> {
    return await this.userModel.findOne({
      raw: true,
      where: { sso_id: jwtPayload.sub },
      rejectOnEmpty: false,
    });
  }
}
