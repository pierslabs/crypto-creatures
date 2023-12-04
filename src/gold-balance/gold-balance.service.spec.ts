import { User } from 'src/users/schema/users.schema';
import { GoldBalanceService } from './gold-balance.service';

describe('GoldBalanceService', () => {
  let service: GoldBalanceService;
  let mockTransactionModel: any;
  let mockMysticCreaturesService: any;
  let mockUsersService: any;

  beforeEach(async () => {
    mockTransactionModel = {
      create: jest.fn(),
    };
    mockMysticCreaturesService = {
      findOne: jest.fn(),
      update: jest.fn(),
    };
    mockUsersService = {
      updateTransactions: jest.fn(),
    };

    service = new GoldBalanceService(
      mockTransactionModel,
      mockMysticCreaturesService,
      mockUsersService,
    );
  });

  it('should add gold', async () => {
    const creatureId = '1';
    const user = { _id: '1' } as User;
    const createTransactionDto = { amount: 10 };

    mockMysticCreaturesService.findOne.mockResolvedValue({
      _id: creatureId,
      goldBalance: 0,
      name: { firstName: 'Test' },
    });
    mockTransactionModel.create.mockResolvedValue({ _id: 'transaction1' });

    const result = await service.addGold(
      creatureId,
      user,
      createTransactionDto,
    );

    expect(result).toEqual({
      newBalance: 10,
      message: 'Gold added to Test',
    });
    expect(mockMysticCreaturesService.update).toHaveBeenCalledWith(creatureId, {
      goldBalance: 10,
    });
    expect(mockUsersService.updateTransactions).toHaveBeenCalledWith(
      user._id,
      'transaction1',
    );
  });

  it('should remove gold', async () => {
    const creatureId = '1';
    const user = { _id: '1' } as User;
    const createTransactionDto = { amount: 10 };

    mockMysticCreaturesService.findOne.mockResolvedValue({
      _id: creatureId,
      goldBalance: 20,
      name: { firstName: 'Test' },
    });
    mockTransactionModel.create.mockResolvedValue({ _id: 'transaction1' });

    const result = await service.removeGold(
      user,
      creatureId,
      createTransactionDto,
    );

    expect(result).toEqual({
      newBalance: 10,
      message: 'Gold remove to Test',
    });
    expect(mockMysticCreaturesService.update).toHaveBeenCalledWith(creatureId, {
      goldBalance: 10,
    });
    expect(mockUsersService.updateTransactions).toHaveBeenCalledWith(
      user._id,
      'transaction1',
    );
  });
});
