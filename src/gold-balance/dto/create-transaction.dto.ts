import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    type: Number,
    description: 'Amount of gold to add or subtract',
  })
  @IsNumber()
  amount: number;
}
