import { Module } from '@nestjs/common';
import { GoldBalanceService } from './gold-balance.service';
import { GoldBalanceController } from './gold-balance.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MysticCreaturesModule } from 'src/mystic-creatures/mystic-creatures.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schema/gold-balance.schema';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    AuthModule,
    MysticCreaturesModule,
    UsersModule,
  ],
  controllers: [GoldBalanceController],
  providers: [GoldBalanceService],
})
export class GoldBalanceModule {}
