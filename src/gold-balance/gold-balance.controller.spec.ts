import { Test, TestingModule } from '@nestjs/testing';
import { GoldBalanceController } from './gold-balance.controller';
import { GoldBalanceService } from './gold-balance.service';

describe('GoldBalanceController', () => {
  let controller: GoldBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldBalanceController],
      providers: [GoldBalanceService],
    }).compile();

    controller = module.get<GoldBalanceController>(GoldBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
