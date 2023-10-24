import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async IsPasswordCorrect(id, password) {
    const user = await this.usersService.findOneById(id);
    return await bcrypt.compare(password, user.hash);
  }
}
