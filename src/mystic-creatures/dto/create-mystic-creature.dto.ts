import {
  IsEnum,
  IsInt,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Gender, Nationality } from '../schema/mystic-creature.schema';

export class NameDto {
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @IsString({ message: 'Title must be a string' })
  title?: string;
}

export class CreateMysticCreatureDto {
  @IsObject({ message: 'Name must be an object' })
  @ValidateNested({ each: true })
  @Type(() => NameDto)
  name: NameDto;

  @IsString({ message: 'Invalid gender' })
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsArray({ message: 'Nationality must be an array' })
  @IsEnum(Nationality, { each: true, message: 'Invalid nationality' })
  nationality: Nationality[];

  @IsString({ message: 'Image must be a string' })
  @IsNotEmpty({ message: 'Image cannot be empty' })
  image: string;

  @IsInt({ message: 'GoldBalance must be an integer' })
  @IsOptional()
  goldBalance?: number;

  @IsInt({ message: 'Speed must be an integer' })
  speed: number;

  @IsInt({ message: 'Health must be an integer' })
  health: number;

  @IsString({ message: 'Secret notes must be a string' })
  @IsOptional()
  secretNotes?: string;

  @IsString({ message: 'Monster password must be a string' })
  monsterPassword: string;
}
