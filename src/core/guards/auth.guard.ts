import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    // @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const [, authorizationToken] = (
      request.headers?.authorization?.toString() || ''
    ).split(' ');

    if (!authorizationToken?.length) {
      return false;
    }

    let jwtPayload: any;

    try {
      const publicKey = this.configService.get('KEYCLOAK_PUBLIC_KEY');

      jwtPayload = JWT.verify(authorizationToken, publicKey);
    } catch (e) {
      throw new UnauthorizedException(e, 'invalid token');
    }

    const authUser =
      await this.authService.getAuthUserFromJwtPayload(jwtPayload);

    if (!authUser) {
      throw new UnauthorizedException('User not found');
    }

    request['authUser'] = Object.freeze(authUser);
    return true;
  }
}
