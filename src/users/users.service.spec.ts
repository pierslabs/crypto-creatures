import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    name: 'dummy',
    role: ['user'],
    password: '$2b$10$GNfcHvlvtb/fR1IiekCzm.47iMthJbjhRAt6ZZMRbwOx9IshKpABC',
    transactions: [],
    _id: '656e0ecbd86c4db94994dbfd',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: User,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const user: CreateUserDto = {
      name: 'dummy',
      password: '123456',
    };

    model.findOne = jest.fn().mockReturnValue(null);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(user.password, salt);

    const newUser = (model.prototype.save = jest.fn().mockResolvedValue({
      ...mockUser,
      ...user,
      password: hashPassword,
    }));

    const createUser = await service.create(user);

    expect(newUser).toBeDefined();

    expect(createUser).toEqual({
      ...mockUser,
      ...user,
      password: expect.any(String),
    });
  });

  it('should findOneByName', async () => {
    const find = (model.find = jest.fn().mockReturnValue(mockUser));
    const user = service.findOneByName('dummy');

    expect(user).toBeDefined();
    expect(find).toHaveBeenCalledWith({ name: 'dummy' });
    expect(user).toEqual(mockUser);
  });

  it('should findOne', async () => {
    const find = (model.findById = jest.fn().mockReturnValue(mockUser));
    const user = service.findOne('656e0ecbd86c4db94994dbfd');

    expect(user).toBeDefined();
    expect(find).toHaveBeenCalledWith('656e0ecbd86c4db94994dbfd');
    expect(user).toEqual(mockUser);
  });

  it('should updateTransactions', async () => {
    const userId = '656e0ecbd86c4db94994dbfd';
    const transactionId = '899e0ecbd86c4dboo90ollkw';
    model.findById = jest.fn().mockReturnValue(mockUser);
    const update = (model.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue(mockUser));

    const user = await service.updateTransactions(userId, transactionId);

    expect(user).toBeDefined();

    expect(update).toHaveBeenCalledWith(
      userId,
      {
        $push: {
          transactions: transactionId,
        },
      },
      {
        new: true,
      },
    );
    expect(user).toEqual(mockUser);
  });
});
