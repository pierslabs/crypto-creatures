import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export type MysticCreatureDocument = HydratedDocument<MysticCreature>;

@Schema({ collection: 'mistic_creatures', versionKey: false, timestamps: true })
export class MysticCreature {
  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
      title: { type: String },
    }),
  )
  name: Record<string, any>;

  @Prop({
    type: String,
    enum: Object.values(Gender),
    default: Gender.Other,
  })
  gender: Gender;

  @Prop()
  description: string;

  @Prop({
    type: [String],
  })
  nationality: string[];

  @Prop()
  image: string;

  @Prop({ default: 0 })
  goldBalance: number;

  @Prop()
  speed: number;

  @Prop()
  health: number;

  @Prop()
  secretNotes: string;

  @Prop()
  monsterPassword: string;
  public _id: string;
}

export const MysticCreatureSchema =
  SchemaFactory.createForClass(MysticCreature);

MysticCreatureSchema.index(
  { 'name.firstName': 1, 'name.lastName': 1, 'name.title': 1 },
  { unique: true },
);
