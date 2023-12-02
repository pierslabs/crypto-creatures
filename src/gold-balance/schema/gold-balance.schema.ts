import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from '../types/transaction.type';
import { Transaction as TransactionEnum } from '../enums/transction.enum';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ collection: 'transactions', timestamps: true, versionKey: false })
export class Transaction {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: String,
    required: true,
  })
  creature: string;

  @Prop({ type: String, enum: TransactionEnum, required: true })
  type: TransactionType;

  public _id: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
