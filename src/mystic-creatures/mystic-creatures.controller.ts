import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MysticCreaturesService } from './mystic-creatures.service';
import { CreateMysticCreatureDto } from './dto/create-mystic-creature.dto';
import { UpdateMysticCreatureDto } from './dto/update-mystic-creature.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Mystic Creatures')
@ApiBearerAuth()
@Controller('mystic-creatures')
export class MysticCreaturesController {
  constructor(
    private readonly mysticCreaturesService: MysticCreaturesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Only Bored Mike can create mystic creatures' })
  @Auth(ValidRoles.BoredMike)
  create(@Body() createMysticCreatureDto: CreateMysticCreatureDto) {
    return this.mysticCreaturesService.create(createMysticCreatureDto);
  }

  @Get()
  @Auth(ValidRoles.BoredMike, ValidRoles.User, ValidRoles.CEO)
  findAll() {
    return this.mysticCreaturesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Only Bored Mike can find one mystic creature' })
  @Auth(ValidRoles.BoredMike)
  findOne(@Param('id') id: string) {
    return this.mysticCreaturesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Only Bored Mike can update mystic creatures' })
  @Auth(ValidRoles.BoredMike)
  update(
    @Param('id') id: string,
    @Body() updateMysticCreatureDto: UpdateMysticCreatureDto,
  ) {
    return this.mysticCreaturesService.update(id, updateMysticCreatureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Only Bored Mike can delete mystic creatures' })
  @Auth(ValidRoles.BoredMike)
  remove(@Param('id') id: string) {
    return this.mysticCreaturesService.remove(id);
  }
}
