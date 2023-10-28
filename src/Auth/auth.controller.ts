import {
  Controller,
  Get,
  Body,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/Users/users.service';
import { AuthorizationRoles } from './jwt_session_payload';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('login')
  async Login(
    @Body() loginBody: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.findOneByUsername(loginBody.username);

    const is_authorized = await this.authService.IsPasswordCorrect(
      user.id,
      loginBody.password,
    );
    if (!is_authorized) throw UnauthorizedException;

    const refresh_token = await this.authService.CreateJwtRefreshToken(
      user,
      AuthorizationRoles.User,
    );

    const DAY_IN_SECONDS = 60 * 60 * 24;
    res.cookie('refreshToken', refresh_token, {
      expires: new Date(Date.now() + DAY_IN_SECONDS * 10),
      sameSite: 'strict',
      httpOnly: true,
      //secure: true,   Enable when docker nginx https is setup
    });

    return;
  }
}
