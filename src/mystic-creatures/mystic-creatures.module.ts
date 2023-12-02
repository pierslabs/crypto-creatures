import { Module } from '@nestjs/common';
import { MysticCreaturesService } from './mystic-creatures.service';
import { MysticCreaturesController } from './mystic-creatures.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MysticCreature,
  MysticCreatureSchema,
} from './schema/mystic-creature.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MysticCreature.name, schema: MysticCreatureSchema },
    ]),
    AuthModule,
  ],
  controllers: [MysticCreaturesController],
  providers: [MysticCreaturesService],
  exports: [MysticCreaturesService],
})
export class MysticCreaturesModule {}
