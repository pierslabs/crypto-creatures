import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    service = { register: jest.fn(), login: jest.fn() } as any;
    controller = new AuthController(service);
  });

  it('should register a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Dummy',
      password: '123456',
    };

    (service.register as jest.Mock).mockResolvedValue('user registered');

    const result = await controller.create(createUserDto);

    expect(result).toBe('user registered');
    expect(service.register).toHaveBeenCalledWith(createUserDto);
  });

  it('should login a user', async () => {
    const loginDto: LoginDto = { name: 'test', password: 'test' };

    (service.login as jest.Mock).mockResolvedValue('user logged in');

    const result = await controller.login(loginDto);

    expect(result).toBe('user logged in');
    expect(service.login).toHaveBeenCalledWith(loginDto);
  });
});
