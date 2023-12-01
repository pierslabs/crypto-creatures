/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMysticCreatureDto } from './dto/create-mystic-creature.dto';
import { UpdateMysticCreatureDto } from './dto/update-mystic-creature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MysticCreature } from './schema/mystic-creature.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MysticCreaturesService {
  constructor(
    @InjectModel(MysticCreature.name)
    private readonly mysticCreatureModel: Model<MysticCreature>,
  ) {}

  logger = new Logger('MysticCreaturesService');

  async create(
    createMysticCreatureDto: CreateMysticCreatureDto,
  ): Promise<MysticCreature> {
    const findCreature = await this.mysticCreatureModel.findOne({
      'name.firstName': createMysticCreatureDto.name.firstName,
      'name.lastName': createMysticCreatureDto.name.lastName,
    });

    if (findCreature) {
      throw new BadRequestException('Creature already exists');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(
        createMysticCreatureDto.monsterPassword,
        salt,
      );

      const createdMysticCreature = new this.mysticCreatureModel({
        ...createMysticCreatureDto,
        monsterPassword: hashPassword,
      });
      return createdMysticCreature.save();
    } catch (error) {
      this.logger.error(error);
      this.handleDBErrors(error);
    }
  }

  findAll() {
    try {
      return this.mysticCreatureModel.find();
    } catch (error) {
      this.logger.error(error);
      this.handleDBErrors(error);
    }
  }

  async findOne(id: string): Promise<MysticCreature> {
    const findCreature = await this.mysticCreatureModel.findById(id);
    if (!findCreature) {
      throw new NotFoundException('Creature does not exist');
    }
    return findCreature;
  }

  async update(
    id: string,
    updateMysticCreatureDto: UpdateMysticCreatureDto,
  ): Promise<Partial<MysticCreature>> {
    await this.findOne(id);

    const salt = await bcrypt.genSalt(10);

    if (updateMysticCreatureDto.monsterPassword) {
      updateMysticCreatureDto.monsterPassword = bcrypt.hashSync(
        updateMysticCreatureDto.monsterPassword,
        salt,
      );
    }

    try {
      const existingCreature = await this.mysticCreatureModel
        .findByIdAndUpdate(
          { _id: id },
          { $set: updateMysticCreatureDto },
          { new: true },
        )
        .lean();

      const { monsterPassword, ...creature } = existingCreature;

      return creature;
    } catch (error) {
      this.logger.error(error);
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const creature = await this.findOne(id);
    if (!creature) {
      throw new NotFoundException('Creature does not exist');
    }
    try {
      await this.mysticCreatureModel.findByIdAndDelete(id);
      return {
        data: `Mystic creature with name: ${creature.name} has been deleted`,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    throw new InternalServerErrorException('Check server logs');
  };
}
