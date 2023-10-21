import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async create(user: User): Promise<string> {
    return (await this.usersRepository.insert(user)).identifiers['id'];
  }
  update(user: User) {
    return this.usersRepository.update(user.id, user);
  }
  async delete(id: string) {
    return this.usersRepository.delete({ id });
  }
}
