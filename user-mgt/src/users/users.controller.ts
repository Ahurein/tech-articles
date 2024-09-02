import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Body() userCreateDto: UserCreateDto) {
    // delegating the creation to services
    return {
      message: 'User created successfully!',
      user: userCreateDto,
    };
  }
}
