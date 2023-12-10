import { Test, TestingModule } from '@nestjs/testing';

import { CreateVoteDto } from './dto/create-vote.dto';
import { UsersService } from '../users/users.service';
import { MysticCreaturesService } from '../mystic-creatures/mystic-creatures.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './schema/vote.schema';
import { VotesService } from './votes.service';
import { Logger } from '@nestjs/common';

describe('VotesService', () => {
  let service: VotesService;
  let userService: UsersService;
  let creatureService: MysticCreaturesService;
  let voteModel: Model<Vote>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: MysticCreaturesService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken(Vote.name),
          useValue: Vote,
        },
      ],
    }).compile();

    service = module.get<VotesService>(VotesService);
    userService = module.get<UsersService>(UsersService);
    creatureService = module.get<MysticCreaturesService>(
      MysticCreaturesService,
    );
    voteModel = module.get<Model<Vote>>(getModelToken(Vote.name));
  });
  it('should create a vote', async () => {
    const createVoteDto: CreateVoteDto = { userId: '1', creatureId: '1' };

    userService.findOne = jest
      .fn()
      .mockResolvedValue({ _id: '1', name: 'Dummy user' });

    creatureService.findOne = jest
      .fn()
      .mockResolvedValue({ _id: '1', name: { firstName: 'Dummy creature' } });

    voteModel.findOne = jest.fn().mockResolvedValue(null);

    voteModel.prototype.save = jest.fn().mockResolvedValue({
      _id: '1',
      userId: '1',
      creatureId: '1',
    });

    const result = await service.create(createVoteDto);

    expect(result).toEqual(
      'New voted emited for creature Dummy creature by user Dummy user',
    );
  });

  it('should throw an error if user not found', async () => {
    const createVoteDto: CreateVoteDto = { userId: '1', creatureId: '1' };

    service.logger = { error: jest.fn() } as unknown as Logger;
    userService.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.create(createVoteDto)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw an error if creature not found', async () => {
    const createVoteDto: CreateVoteDto = { userId: '1', creatureId: '1' };
    service.logger = { error: jest.fn() } as unknown as Logger;

    userService.findOne = jest.fn().mockResolvedValue({ _id: '1' });
    creatureService.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.create(createVoteDto)).rejects.toThrow(
      'Creature not found',
    );
  });

  it('should find all votes', async () => {
    const mockVotes = [
      {
        _id: '1',
        userId: '1',
        creatureId: '1',
      },
      {
        _id: '2',
        userId: '2',
        creatureId: '2',
      },
    ];

    voteModel.find = jest.fn().mockResolvedValue(mockVotes);

    const result = await service.findAll();

    expect(result).toEqual(mockVotes);
  });

  it('should remove a vote', async () => {
    const mockVote = {
      _id: '1',
      userId: '1',
      creatureId: '1',
      createdAt: '2023-12-24T00:00:00.000Z',
    };

    const mockUser = {
      _id: '1',
      name: 'Dummy user',
    };

    userService.findOne = jest.fn().mockResolvedValue(mockUser);
    voteModel.findById = jest.fn().mockResolvedValue(mockVote);
    voteModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    service.hasVotedToday = jest.fn().mockReturnValue(true);

    const result = await service.remove('1', '1');

    expect(result).toEqual(undefined);
  });

  it('should hasVotedToday return true', () => {
    const result = service.hasVotedToday(new Date());

    expect(result).toEqual(true);
  });
});
