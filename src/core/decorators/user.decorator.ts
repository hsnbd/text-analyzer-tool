import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthUser } from '../interfaces/auth-user';

export const AuthUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): IAuthUser | null => {
    const { authUser } = ctx.switchToHttp().getRequest();

    return authUser;
  },
);
