import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LawBaseService } from './sub-services/law-base.service';
import { LawMaterialService } from './sub-services/law-material.service';
import { LawUpdateService } from './sub-services/law-update.service';
import {
  CreateLawBaseDto,
  UpdateLawBaseDto,
  QueryLawDto,
  CreateLawMaterialDto,
  CreateLawUpdateDto,
} from './dto/law.dto';

@ApiTags('Laws')
@Controller('laws')
export class LawController {
  constructor(
    private baseService: LawBaseService,
    private materialService: LawMaterialService,
    private updateService: LawUpdateService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create law' })
  create(@Body() dto: CreateLawBaseDto) {
    return this.baseService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List laws with pagination' })
  findAll(@Query() query: QueryLawDto) {
    return this.baseService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get law detail' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update law' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLawBaseDto) {
    return this.baseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete law' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.remove(id);
  }

  @Post(':id/materials')
  @ApiOperation({ summary: 'Add material compliance to law' })
  createLawMaterial(
    @Param('id', ParseIntPipe) lawId: number,
    @Body() dto: CreateLawMaterialDto,
  ) {
    return this.materialService.create({ ...dto, lawId });
  }

  @Get(':id/materials')
  @ApiOperation({ summary: 'List material compliance for law' })
  findLawMaterials(@Param('id', ParseIntPipe) lawId: number) {
    return this.materialService.findByLaw(lawId);
  }

  @Post(':id/updates')
  @ApiOperation({ summary: 'Add update to law' })
  createLawUpdate(
    @Param('id', ParseIntPipe) lawId: number,
    @Body() dto: CreateLawUpdateDto,
  ) {
    return this.updateService.create({ ...dto, lawId });
  }

  @Get(':id/updates')
  @ApiOperation({ summary: 'List updates for law' })
  findLawUpdates(@Param('id', ParseIntPipe) lawId: number) {
    return this.updateService.findByLaw(lawId);
  }
}
