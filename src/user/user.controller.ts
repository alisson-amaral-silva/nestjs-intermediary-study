import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
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
  create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/users/${user.username}` })
      .withBody(createdUser)
      .build();
  }

  @Get(':username')
  getByUsername(@Param() params): User {
    const user = this.userService.getByUsername(params.username);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User ${params.username}`,
      });
    }

    return user;
  }
}
