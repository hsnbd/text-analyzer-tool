import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTextDto } from '../dto/create-text.dto';
import { UpdateTextDto } from '../dto/update-text.dto';
import { TextService } from '../services/text.service';
import { AuthUser } from '../../../core/decorators/user.decorator';
import { IAuthUser } from '../../../core/interfaces/auth-user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../core/guards/auth.guard';

@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
@ApiTags('text crud')
@Controller('texts')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  create(
    @Body() createTextDto: CreateTextDto,
    @AuthUser() authUser: IAuthUser,
  ) {
    return this.textService.create(createTextDto, authUser);
  }

  @Get()
  findAll(@AuthUser() authUser: IAuthUser) {
    return this.textService.findAll(authUser);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() authUser: IAuthUser,
  ) {
    return this.textService.findOne(id, authUser);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTextDto: UpdateTextDto,
    @AuthUser() authUser: IAuthUser,
  ) {
    return this.textService.update(id, updateTextDto, authUser);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() authUser: IAuthUser,
  ) {
    return this.textService.remove(id, authUser);
  }
}
