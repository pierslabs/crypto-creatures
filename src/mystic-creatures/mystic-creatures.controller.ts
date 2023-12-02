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

@Controller('mystic-creatures')
export class MysticCreaturesController {
  constructor(
    private readonly mysticCreaturesService: MysticCreaturesService,
  ) {}

  @Post()
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
  @Auth(ValidRoles.BoredMike)
  findOne(@Param('id') id: string) {
    return this.mysticCreaturesService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.BoredMike)
  update(
    @Param('id') id: string,
    @Body() updateMysticCreatureDto: UpdateMysticCreatureDto,
  ) {
    return this.mysticCreaturesService.update(id, updateMysticCreatureDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.BoredMike)
  remove(@Param('id') id: string) {
    return this.mysticCreaturesService.remove(id);
  }
}
