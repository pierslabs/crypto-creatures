import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Role } from '../enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false,
  id: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: [String],
    enum: Object.values(Role),
  })
  role: Role[];

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Transaction' }] })
  transactions: string[];

  public _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
