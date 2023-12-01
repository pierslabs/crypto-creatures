import { Test, TestingModule } from '@nestjs/testing';
import { MysticCreaturesService } from './mystic-creatures.service';

describe('MysticCreaturesService', () => {
  let service: MysticCreaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MysticCreaturesService],
    }).compile();

    service = module.get<MysticCreaturesService>(MysticCreaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
