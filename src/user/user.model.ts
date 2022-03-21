import { Exclude } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUsernameAlreadyExist } from './is-username-already-exist-validator';

export class User {
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsUsernameAlreadyExist({ message: 'username already exists' })
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDate()
  creationDate: Date;
}
