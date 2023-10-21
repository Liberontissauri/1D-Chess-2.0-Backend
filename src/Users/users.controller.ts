import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findById(@Param() params: any): Promise<FindUserByIdDto> {
    const user = await this.usersService.findOneById(params.id);

    const transfer_user = new FindUserByIdDto();
    transfer_user.username = user.username;
    transfer_user.created_at = user.createdAt;
    transfer_user.updated_at = user.updateAt;

    return transfer_user;
  }

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
