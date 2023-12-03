/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MysticCreaturesService } from './mystic-creatures.service';
import {
  Gender,
  MysticCreature,
  Nationality,
} from './schema/mystic-creature.schema';
import { Model, model } from 'mongoose';

import { getModelToken } from '@nestjs/mongoose';
import { CreateMysticCreatureDto } from './dto/create-mystic-creature.dto';
import { UpdateMysticCreatureDto } from './dto/update-mystic-creature.dto';
import { Logger } from '@nestjs/common';

describe('MysticCreaturesService', () => {
  let service: MysticCreaturesService;
  let mockModel: Model<MysticCreature>;
  const mockCreature = {
    name: {
      firstName: 'Seraphina',
      lastName: 'Nocturna',
      title: 'Enchantress',
    },
    gender: Gender.Female,
    description:
      'A majestic and powerful creature, known for its extraordinary abilities.',
    nationality: ['US', 'DE'] as Nationality[],
    image: 'https://example.com/cool-monster-image.jpg',
    goldBalance: 18,
    speed: 97,
    health: 100,
    secretNotes:
      'Is the guardian of the enchanted forest and keeper of ancient secrets.',
    monsterPassword: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MysticCreaturesService,
        {
          provide: getModelToken(MysticCreature.name),
          useValue: MysticCreature,
        },
      ],
    }).compile();

    service = module.get<MysticCreaturesService>(MysticCreaturesService);
    mockModel = module.get<Model<MysticCreature>>(
      getModelToken(MysticCreature.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new creature', async () => {
    mockModel.findOne = jest.fn().mockReturnValue(null);
    const mockSave = jest.fn().mockResolvedValue(mockCreature);
    mockModel.prototype.save = mockSave;

    const result = await service.create(
      mockCreature as CreateMysticCreatureDto,
    );
    expect(result).toEqual(mockCreature);
  });

  it('should throw an error if creature already exists', async () => {
    mockModel.findOne = jest.fn().mockReturnValue(mockCreature);
    await expect(
      service.create(mockCreature as CreateMysticCreatureDto),
    ).rejects.toThrow('Creature already exists');
  });

  it('should find all creatures', async () => {
    mockModel.find = jest.fn().mockResolvedValue([mockCreature]);
    const res = await service.findAll();

    expect(res).toEqual([mockCreature]);
  });

  it('should find one creature', async () => {
    mockModel.findById = jest.fn().mockResolvedValue(mockCreature);
    const res = await service.findOne('1234');

    expect(res).toEqual(mockCreature);
  });

  it('should throw an error if creature does not exist', async () => {
    mockModel.findById = jest.fn().mockResolvedValue(null);
    await expect(service.findOne('1234')).rejects.toThrow(
      'Creature does not exist',
    );
  });

  it('should update a creature', async () => {
    service.findOne = jest.fn().mockResolvedValue([mockCreature]);

    mockModel.findByIdAndUpdate = jest.fn().mockImplementation(() => ({
      lean: jest.fn().mockResolvedValue(mockCreature),
    }));

    const updateDto: UpdateMysticCreatureDto = {
      goldBalance: 100,
    };

    const result = await service.update('1234', updateDto);

    const { monsterPassword, ...creature } = mockCreature;

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: '1234' },
      { $set: updateDto },
      { new: true },
    );

    expect(result).toEqual(creature);
  });

  it('should delete a creature', async () => {
    service.findOne = jest.fn().mockResolvedValue(mockCreature);
    mockModel.findByIdAndDelete = jest.fn().mockResolvedValue(mockCreature);
    const res = await service.remove('1234');

    expect(res).toEqual({
      data: `Mystic creature with name: ${mockCreature.name} has been deleted`,
    });
  });

  it('should throw an error if creature does not exist', async () => {
    service.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.remove('1234')).rejects.toThrow(
      'Creature does not exist',
    );
  });
});
