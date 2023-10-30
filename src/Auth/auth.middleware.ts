import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthMiddlewareDto } from './dto/auth.middleware.dto';
import { AuthorizationRoles, TokenType } from './jwt_session_payload';
import { AuthService } from './auth.service';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const body: AuthMiddlewareDto = req.body;

    let authentication_info: AuthenticationInfo = {
      user_id: undefined,
      username: undefined,
      role: AuthorizationRoles.Guest,
    };
    req['authentication_info'] = authentication_info;

    if (!body.access_token) return next();

    let token;
    try {
      token = await this.authService.ParseJwtToken(body.access_token);
    } catch (error) {
      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException('invalid access token');
      else throw error;
    }

    if (token.type != TokenType.Access) return next();

    authentication_info = {
      user_id: token.user_id,
      username: token.username,
      role: token.role,
    };
    req['authentication_info'] = authentication_info;
    return next();
  }
}

export class AuthenticationInfo {
  user_id: string | undefined;
  username: string | undefined;
  role: AuthorizationRoles | undefined;
}
