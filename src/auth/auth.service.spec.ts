import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: any;
  let mockJwtService: any;

  beforeEach(async () => {
    mockUsersService = {
      findOne: jest.fn(),
      create: jest.fn(),
      findOneByName: jest.fn(),
    };
    mockJwtService = {
      sign: jest.fn(),
    };

    service = new AuthService(mockUsersService, mockJwtService);
  });

  it('should login a user', async () => {
    const loginDto: LoginDto = { name: 'test', password: 'test' };

    mockUsersService.findOneByName = jest.fn().mockResolvedValue([
      {
        _id: '1',
        name: 'test',
        password: bcrypt.hashSync('test', 10),
        role: 'user',
      },
    ]);

    mockJwtService.sign.mockReturnValue('token');

    const result = await service.login(loginDto);

    expect(result).toEqual({ token: 'token' });
  });

  it('should register a user', async () => {
    const createUserDto: CreateUserDto = { name: 'test', password: 'test' };

    mockUsersService.create.mockResolvedValue({ _id: '1' });
    mockJwtService.sign.mockReturnValue('token');

    const result = await service.register(createUserDto);

    expect(result).toEqual({ token: 'token' });
  });

  it('should validate a user', async () => {
    const userId = '1';

    const user = mockUsersService.findOne.mockResolvedValue({
      _id: userId,
      role: 'user',
      name: 'test',
      password: 'test',
    });

    delete user.password;

    const result = await service.validateUser(userId);

    expect(result).toEqual({
      _id: userId,
      role: 'user',
      name: 'test',
    });
  });

  it('should check if a day is a weekday', () => {
    const dayNumber = 1;

    const result = service.isDayOfWeek(dayNumber);

    expect(result).toBe(true);
  });
});
