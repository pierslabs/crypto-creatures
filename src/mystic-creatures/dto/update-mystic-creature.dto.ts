import { PartialType } from '@nestjs/mapped-types';
import { CreateMysticCreatureDto } from './create-mystic-creature.dto';

export class UpdateMysticCreatureDto extends PartialType(
  CreateMysticCreatureDto,
) {}
