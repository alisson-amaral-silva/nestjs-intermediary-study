import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param() params): User {
    return this.userService.getById(params.id);
  }

  @Post()
  create(@Body() user) {
    return this.userService.create(user);
  }

  @Get(':username')
  getByUsername(@Param() params): User {
    return this.userService.getByUsername(params.username);
  }
}
