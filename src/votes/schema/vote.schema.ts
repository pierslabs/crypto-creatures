import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema({
  collection: 'votes',
  timestamps: true,
  versionKey: false,
  id: true,
})
export class Vote {
  @Prop({
    type: String,
    required: true,
  })
  creatureId: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  public createdAt: Date;

  public _id: any;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
VoteSchema.index({ creatureId: 1, userId: 1 });
