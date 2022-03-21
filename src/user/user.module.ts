import { Module } from '@nestjs/common';
import { IsUsernameAlreadyExistConstraint } from './is-username-already-exist-validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, IsUsernameAlreadyExistConstraint],
})
export class UserModule {}
