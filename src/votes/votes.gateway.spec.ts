import { Test, TestingModule } from '@nestjs/testing';
import { VotesGateway } from './votes.gateway';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

describe('VotesGateway', () => {
  let gateway: VotesGateway;
  let votesService: VotesService;

  beforeEach(async () => {
    const votesServiceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesGateway,
        { provide: VotesService, useValue: votesServiceMock },
      ],
    }).compile();

    gateway = module.get<VotesGateway>(VotesGateway);
    votesService = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should call votesService.create on create', async () => {
    const createVoteDto = new CreateVoteDto();
    votesService.create(createVoteDto);
    gateway.server = {
      emit: jest.fn().mockResolvedValue({
        msg: 'New vote',
        content: createVoteDto,
      }),
    } as any;

    const res = await gateway.create(createVoteDto);

    expect(votesService.create).toHaveBeenCalledWith(createVoteDto);

    expect(res).toEqual({
      msg: 'New vote',
      content: createVoteDto,
    });
  });

  it('should call votesService.findAll on findAll', async () => {
    await votesService.findAll();

    gateway.server = {
      emit: jest.fn().mockResolvedValue({
        msg: 'All votes',
        content: [
          {
            _id: '65756bead505ccce42b385e0',
            creatureId: '6570440dae7a0ff18aff2e83',
            userId: '6570453fae7a0ff18aff2ea0',
            createdAt: '2023-12-10T07:42:34.429Z',
            updatedAt: '2023-12-10T07:42:34.429Z',
          },
        ],
      }),
    } as any;

    const res = await gateway.findAll();

    expect(votesService.findAll).toHaveBeenCalled();

    expect(res).toEqual({
      msg: 'All votes',
      content: [
        {
          _id: '65756bead505ccce42b385e0',
          creatureId: '6570440dae7a0ff18aff2e83',
          userId: '6570453fae7a0ff18aff2ea0',
          createdAt: '2023-12-10T07:42:34.429Z',
          updatedAt: '2023-12-10T07:42:34.429Z',
        },
      ],
    });
  });

  it('should call votesService.remove on remove', async () => {
    const body = { id: '1', userId: '1' };

    await votesService.remove(body.id, body.userId);

    gateway.server = {
      emit: jest.fn().mockResolvedValue({
        msg: 'Vote removed',
      }),
    } as any;

    const res = await gateway.remove(body);

    expect(res).toEqual({ msg: 'Vote removed' });
  });
});
