import { Body, Controller, Param, Post } from '@nestjs/common';
import { GoldBalanceService } from './gold-balance.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/enums/roles.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/schema/users.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('gold-balance')
export class GoldBalanceController {
  constructor(private readonly goldBalanceService: GoldBalanceService) {}

  @Post('add/:cretureId')
  @Auth(ValidRoles.CEO)
  addGold(
    @CurrentUser() user: User,
    @Param('cretureId') cretureId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.goldBalanceService.addGold(
      cretureId,
      user,
      createTransactionDto,
    );
  }

  @Auth(ValidRoles.BoredMike)
  @Post('remove/:cretureId')
  removeGold(
    @CurrentUser() user: User,
    @Param('cretureId') creatureId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.goldBalanceService.removeGold(
      user,
      creatureId,
      createTransactionDto,
    );
  }
}
