import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from './enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  logger = new Logger('UsersService');

  async create(createUserDto: CreateUserDto): Promise<User> {
    const findUser = await this.userModel.findOne({
      name: createUserDto.name,
    });

    if (findUser) {
      throw new BadRequestException('User already exists');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(createUserDto.password, salt);

      const user = new this.userModel({
        ...createUserDto,
        password: hashPassword,
        role: Role.User,
      });

      return user.save();
    } catch (error) {
      this.logger.error(error);
      this.handleDBErrors(error);
    }
  }

  findOneByName(name: string) {
    return this.userModel.find({ name });
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  private handleDBErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    throw new InternalServerErrorException('Check server logs');
  };
}
