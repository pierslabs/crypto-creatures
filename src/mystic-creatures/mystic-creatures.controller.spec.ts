import { Test, TestingModule } from '@nestjs/testing';
import { MysticCreaturesController } from './mystic-creatures.controller';
import { MysticCreaturesService } from './mystic-creatures.service';
import { CreateMysticCreatureDto } from './dto/create-mystic-creature.dto';
import { PassportModule } from '@nestjs/passport';
import { UpdateMysticCreatureDto } from './dto/update-mystic-creature.dto';

describe('MysticCreaturesController', () => {
  let controller: MysticCreaturesController;
  let service: MysticCreaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [MysticCreaturesController],
      providers: [
        {
          provide: MysticCreaturesService,
          useFactory: () => ({
            create: jest.fn(() => []),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => {}),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<MysticCreaturesController>(
      MysticCreaturesController,
    );
    service = module.get<MysticCreaturesService>(MysticCreaturesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create create method', () => {
    const dto = new CreateMysticCreatureDto();
    controller.create(dto);

    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(dto);
  });
  it('calling findAll note method', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('calling findOne method', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalled();
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('calling update method', () => {
    const dto = new UpdateMysticCreatureDto();
    const id = '1';

    controller.update(id, dto);

    expect(service.update).toHaveBeenCalled();
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('calling remove method', () => {
    const id = '1';
    controller.remove(id);

    expect(service.remove).toHaveBeenCalled();
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
