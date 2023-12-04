import { User } from 'src/users/schema/users.schema';
import { GoldBalanceController } from './gold-balance.controller';
import { GoldBalanceService } from './gold-balance.service';
import { Role } from 'src/users/enums/roles.enum';

describe('GoldBalanceController', () => {
  let controller: GoldBalanceController;
  let service: GoldBalanceService;

  const user: User = {
    name: 'Jhon Doe',
    role: ['user'] as Role[],
    password: '$2b$10$GNfcHvlvtb/fR1IiekCzm.47iMthJbjhRAt6ZZMRbwOx9IshKpABC',
    transactions: [],
    _id: '656e0ecbd86c4db94994dbfd',
  };

  beforeEach(async () => {
    service = { addGold: jest.fn() } as any;
    controller = new GoldBalanceController(service);
  });

  it('should add gold', async () => {
    const creatureId = '1';

    const createTransactionDto = { amount: 10 };

    (service.addGold as jest.Mock).mockResolvedValue({
      newBalance: 20,
      message: 'Gold added to Test',
    });

    const result = await controller.addGold(
      user,
      creatureId,
      createTransactionDto,
    );

    expect(result).toEqual({
      newBalance: 20,
      message: 'Gold added to Test',
    });
    expect(service.addGold).toHaveBeenCalledWith(
      creatureId,
      user,
      createTransactionDto,
    );
  });

  it('should remove gold', async () => {
    const creatureId = '1';

    const createTransactionDto = { amount: 10 };

    service.removeGold = jest.fn().mockResolvedValue({
      newBalance: 0,
      message: 'Gold removed from Test',
    });

    const result = await controller.removeGold(
      user,
      creatureId,
      createTransactionDto,
    );

    expect(result).toEqual({
      newBalance: 0,
      message: 'Gold removed from Test',
    });
    expect(service.removeGold).toHaveBeenCalledWith(
      user,
      creatureId,
      createTransactionDto,
    );
  });
});
