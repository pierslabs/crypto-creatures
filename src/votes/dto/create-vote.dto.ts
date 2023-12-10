import { IsString } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  creatureId: string;

  @IsString()
  userId: string;
}
