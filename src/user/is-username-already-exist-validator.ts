import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.service';

@Injectable()
@ValidatorConstraint()
export class IsUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  validate(
    username: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const user = this.userService.getByUsername(username);
    return !!!user;
  }
}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [], //* extra validations
      validator: IsUsernameAlreadyExistConstraint,
    });
  };
}
