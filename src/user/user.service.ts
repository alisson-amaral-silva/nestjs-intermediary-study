import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: Array<User> = [
    {
      id: 1,
      username: 'gabriel',
      email: 'gabriel.leite@alura.com.br',
      password: '123456',
      name: 'Gabriel Leite',
      creationDate: new Date(),
    },
  ];

  constructor() {}

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  create(user: User) {
    this.users.push(user);
  }

  async getByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
