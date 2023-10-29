import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/Users/users.entity';
import {
  AuthorizationRoles,
  JwtSessionPayload,
  TokenType,
} from './jwt_session_payload';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async IsPasswordCorrect(id, password) {
    const user = await this.usersService.findOneById(id);
    return await bcrypt.compare(password, user.hash);
  }

  async CreateJwtRefreshToken(user: User, role: AuthorizationRoles) {
    const token_id = randomUUID();

    const payload = new JwtSessionPayload(
      token_id,
      user.id,
      user.username,
      TokenType.Refresh,
      role,
    );

    const refresh_token = jwt.sign(
      { ...payload },
      process.env['JWT_REFRESH_SECRET'],
      {
        expiresIn: '20 days',
      },
    );

    return refresh_token;
  }

  async CreateJwtAccessToken(user: User, role: AuthorizationRoles) {
    const token_id = randomUUID();

    const payload = new JwtSessionPayload(
      token_id,
      user.id,
      user.username,
      TokenType.Access,
      role,
    );

    const access_token = jwt.sign(
      { ...payload },
      process.env['JWT_REFRESH_SECRET'],
      {
        expiresIn: '10 minutes',
      },
    );

    return access_token;
  }

  async ParseJwtToken(token_string: string) {
    const token = jwt.verify(token_string, process.env['JWT_REFRESH_SECRET']);
    if (typeof token == 'string')
      throw Error('Token cannot be parsed to string');
    return token;
  }
}
