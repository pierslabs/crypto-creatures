import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { AuthReponse } from './types/auth.response';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class AuthService {
  logger = new Logger('Auth Service');

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async login(loginDto: LoginDto): Promise<AuthReponse> {
    const { name, password } = loginDto;
    const user = await this.usersService.findOneByName(name);

    if (!bcrypt.compareSync(password, user[0].password))
      throw new BadRequestException('Name or Password are incorrect');

    const token = this.getJwtToken(user[0]._id.toString());

    return {
      token: token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthReponse> {
    try {
      const user = await this.usersService.create(createUserDto);

      const token = this.getJwtToken(user._id.toString());

      return { token };
    } catch (error) {
      this.logger.error('💣', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (user.role[0] === 'user')
      throw new UnauthorizedException(
        'User is not authorized, talk with admin 👮‍♂️',
      );

    delete user.password;

    return user;
  }
}
