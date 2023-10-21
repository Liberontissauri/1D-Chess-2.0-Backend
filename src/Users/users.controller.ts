import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userBody: CreateUserDto) {
    const new_user = new User();

    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(userBody.password, salt);

    new_user.username = userBody.username;
    new_user.hash = hash;
    new_user.salt = salt;
    new_user.createdAt = new Date(Date.now());
    new_user.updateAt = new Date(Date.now());

    const id = await this.usersService.create(new_user);
    return id;
  }
}
