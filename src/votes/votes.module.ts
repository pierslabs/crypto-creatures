import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesGateway } from './votes.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Vote, VoteSchema } from './schema/vote.schema';
import { UsersModule } from 'src/users/users.module';
import { MysticCreaturesModule } from 'src/mystic-creatures/mystic-creatures.module';
import { MysticCreature } from 'src/mystic-creatures/schema/mystic-creature.schema';
import { User } from 'src/users/schema/users.schema';

@Module({
  imports: [
    UsersModule,
    MysticCreaturesModule,
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
  ],
  providers: [VotesGateway, VotesService, User, MysticCreature],
})
export class VotesModule {}
