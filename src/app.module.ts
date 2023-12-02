import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MysticCreaturesModule } from './mystic-creatures/mystic-creatures.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoldBalanceModule } from './gold-balance/gold-balance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MysticCreaturesModule,
    UsersModule,
    AuthModule,
    GoldBalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
