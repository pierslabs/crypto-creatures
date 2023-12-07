import { Body, Controller, Param, Post } from '@nestjs/common';
import { GoldBalanceService } from './gold-balance.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/enums/roles.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/schema/users.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Gold Balance')
@ApiBearerAuth()
@Controller('gold-balance')
export class GoldBalanceController {
  constructor(private readonly goldBalanceService: GoldBalanceService) {}

  @Post('add/:cretureId')
  @ApiOperation({ summary: 'Only CEO can add gold' })
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

  /**
   * only bored mike can remove gold
   */

  @Post('remove/:cretureId')
  @ApiOperation({ summary: 'Only Bored Mike can remove gold' })
  @Auth(ValidRoles.BoredMike)
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
