import { Test, TestingModule } from '@nestjs/testing';
import { MysticCreaturesController } from './mystic-creatures.controller';
import { MysticCreaturesService } from './mystic-creatures.service';

describe('MysticCreaturesController', () => {
  let controller: MysticCreaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MysticCreaturesController],
      providers: [MysticCreaturesService],
    }).compile();

    controller = module.get<MysticCreaturesController>(MysticCreaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
