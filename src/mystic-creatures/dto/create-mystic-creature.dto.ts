import {
  IsEnum,
  IsInt,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Gender } from '../schema/mystic-creature.schema';
import { ApiProperty } from '@nestjs/swagger';

export class NameDto {
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @IsString({ message: 'Title must be a string' })
  title?: string;
}

export class CreateMysticCreatureDto {
  @ApiProperty({
    type: Object,
    description: 'Name of the creature',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      title: { type: 'string' },
    },
  })
  @IsObject({ message: 'Name must be an object' })
  @ValidateNested({ each: true })
  @Type(() => NameDto)
  name: NameDto;

  @ApiProperty({
    type: Array,
    description: 'Gender of the creature',
    enum: Gender,
  })
  @IsString({ message: 'Invalid gender' })
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: string;

  @ApiProperty({
    type: String,
    description: 'Description of the creature',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({
    type: Array,
    description: 'Array of nationalities of the creature',
    example: ['US', 'UK'],
  })
  @IsArray({ message: 'Nationality must be an array' })
  @IsString({ each: true, message: 'Each nationality should be a string' })
  @Length(2, 2, {
    each: true,
    message: 'Each nationality should be a string of two characters',
  })
  nationality: string[];

  @ApiProperty({
    type: String,
    description: 'Image of the creature',
  })
  @IsString({ message: 'Image must be a string' })
  @IsNotEmpty({ message: 'Image cannot be empty' })
  image: string;

  @ApiProperty({
    type: Number,
    description: 'Gold balance of the creature',
  })
  @IsInt({ message: 'GoldBalance must be an integer' })
  @IsOptional()
  goldBalance?: number;

  @ApiProperty({
    type: Number,
    description: 'Speed of the creature',
  })
  @IsInt({ message: 'Speed must be an integer' })
  speed: number;

  @ApiProperty({
    type: Number,
    description: 'Health of the creature',
  })
  @IsInt({ message: 'Health must be an integer' })
  health: number;

  @ApiProperty({
    type: String,
    description: 'Secrets of the creature',
  })
  @IsString({ message: 'Secret notes must be a string' })
  @IsOptional()
  secretNotes?: string;

  @ApiProperty({
    type: String,
    description: 'Password creature',
  })
  @IsString({ message: 'Monster password must be a string' })
  monsterPassword: string;
}
