import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEmail,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UserPhotoDto } from './user-photo.dto';
import { IsValidPassword } from '../validators/is-valid-password.validator';
import { IsUsernameUnique } from '../validators/is-username-unique.validator';

export class UserCreateDto {
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  @Transform(({ value }) => value.trim())
  @IsUsernameUnique({ server: 'east-1', message: 'Username already exists' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsValidPassword()
  password: string;

  @IsInt()
  @Min(18, { message: 'Age must be at least 18' })
  @Max(100, { message: 'Age must not exceed 100' })
  age: number;

  @IsDate({ message: 'Invalid date format' })
  @Type(() => Date)
  dateOfBirth: Date;

  @IsArray()
  @ArrayNotEmpty({ message: 'Photos array should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => UserPhotoDto)
  photos: UserPhotoDto[];
}
