import { Injectable, Logger } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './schema/vote.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UsersService } from 'src/users/users.service';
import { MysticCreaturesService } from 'src/mystic-creatures/mystic-creatures.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectModel(Vote.name)
    private readonly voteModel: Model<Vote>,
    private readonly userService: UsersService,
    private readonly mysticCreatureService: MysticCreaturesService,
  ) {}

  logger = new Logger('VotesService');

  async create(createVoteDto: CreateVoteDto) {
    try {
      const findUser = await this.userService.findOne(createVoteDto.userId);

      if (!findUser) {
        throw new Error('User not found');
      }

      const findCreature = await this.mysticCreatureService.findOne(
        createVoteDto.creatureId,
      );
      if (!findCreature) {
        throw new Error('Creature not found');
      }

      const createdVote = new this.voteModel({
        creatureId: findUser._id,
        userId: findCreature._id,
      });

      const findVote = await this.voteModel.findOne({
        userId: findUser._id,
        createdAt: new Date(),
      });

      if (findVote) {
        throw new Error('User already voted');
      }

      await createdVote.save();

      return `New voted emited for creature ${findCreature.name.firstName} by user ${findUser.name}`;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.voteModel.find();
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    const user = await this.userService.findOne(userId);

    try {
      if (!user) {
        throw new Error('User not found');
      }

      const findVote = await this.voteModel.findById(id);

      if (!findVote) {
        throw new Error('Vote not found');
      }

      const hasVotedToday = this.hasVotedToday(findVote.createdAt);

      if (!hasVotedToday) {
        throw new Error('Vote cannot be removed');
      }

      await this.voteModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  hasVotedToday(date: Date) {
    const voteDay = new Date(date).getDay();
    const day = new Date().getDay();
    return voteDay === day;
  }
}
