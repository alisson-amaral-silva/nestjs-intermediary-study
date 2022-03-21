import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
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
  create(@Body() user: User, @Res() res) {
    const createdUser = this.userService.create(user);
    res
      .status(HttpStatus.CREATED)
      .location(`/users/${user.username}`)
      .json(createdUser);
  }

  @Get(':username')
  getByUsername(@Param() params): User {
    return this.userService.getByUsername(params.username);
  }
}
