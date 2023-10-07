import { Module } from '@nestjs/common';
import { UsersController } from 'src/Users/users.controller';
import { UsersService } from 'src/Users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
