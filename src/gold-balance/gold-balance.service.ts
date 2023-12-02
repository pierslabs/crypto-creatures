import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MysticCreaturesService } from 'src/mystic-creatures/mystic-creatures.service';
import { User } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';
import { Transaction } from './schema/gold-balance.schema';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction as TransactionEnum } from './enums/transction.enum';

@Injectable()
export class GoldBalanceService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    private readonly mysticCreaturesService: MysticCreaturesService,
    private readonly userService: UsersService,
  ) {}

  logger = new Logger('GoldBalanceService');

  async addGold(
    cretureId: string,
    user: User,
    createTransactionDto: CreateTransactionDto,
  ) {
    const creature = await this.mysticCreaturesService.findOne(cretureId);

    if (!creature) {
      throw new Error('Creature not found');
    }

    try {
      const transaction = await this.transactionModel.create({
        userId: user._id,
        amount: createTransactionDto.amount,
        creature: creature._id,
        type: TransactionEnum.Add,
      });

      const newBalance = creature.goldBalance + createTransactionDto.amount;

      this.mysticCreaturesService.update(cretureId, {
        goldBalance: newBalance,
      });

      this.userService.updateTransactions(user._id, transaction._id);

      return {
        newBalance,
        message: `Gold added to ${creature.name.firstName}`,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async removeGold(
    user: User,
    creatureId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const creature = await this.mysticCreaturesService.findOne(creatureId);

    if (!creature) {
      throw new Error('Creature not found');
    }

    try {
      const transaction = await this.transactionModel.create({
        userId: user._id,
        amount: createTransactionDto.amount,
        creature: creature._id,
        type: TransactionEnum.Remove,
      });

      let newBalance = creature.goldBalance - createTransactionDto.amount;

      const excess = newBalance < 0 ? Math.abs(newBalance) : 0;

      if (excess) {
        newBalance = Math.max(0, newBalance);
      }

      this.mysticCreaturesService.update(creatureId, {
        goldBalance: newBalance,
      });

      this.userService.updateTransactions(user._id, transaction._id);

      return {
        newBalance,
        message: `Gold remove to ${creature.name.firstName}`,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
