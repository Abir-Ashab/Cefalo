import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [{
    id : 1,
    email : 'arif@gmail.com',
    name : 'arif',
  }];
  private id = 1;

  create(user: CreateUserDto) {
    const newUser = { id: this.id++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, data: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, data);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
    return { message: 'Deleted successfully' };
  }
}