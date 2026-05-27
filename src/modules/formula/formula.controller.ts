import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FormulaBaseService } from './sub-services/formula-base.service';
import { FormulaMaterialService } from './sub-services/formula-material.service';
import { FormulaLogicService } from './sub-services/formula-logic.service';
import { FormulaGeneratorService } from './formula-generator.service';
import {
  CreateFormulaBaseDto,
  UpdateFormulaBaseDto,
  QueryFormulaDto,
  CreateFormulaMaterialDto,
  CreateFormulaLogicDto,
  GenerateFormulaDto,
} from './dto/formula.dto';

@ApiTags('Formulas')
@Controller('formulas')
export class FormulaController {
  constructor(
    private baseService: FormulaBaseService,
    private materialService: FormulaMaterialService,
    private logicService: FormulaLogicService,
    private generatorService: FormulaGeneratorService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create formula manually' })
  create(@Body() dto: CreateFormulaBaseDto) {
    return this.baseService.create(dto);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Auto-generate formula from health problem' })
  generate(@Body() dto: GenerateFormulaDto) {
    return this.generatorService.generate(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List formulas with pagination' })
  findAll(@Query() query: QueryFormulaDto) {
    return this.baseService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get formula detail' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update formula' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormulaBaseDto) {
    return this.baseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete formula' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.remove(id);
  }

  @Post(':id/materials')
  @ApiOperation({ summary: 'Add material to formula' })
  createFormulaMaterial(
    @Param('id', ParseIntPipe) formulaId: number,
    @Body() dto: CreateFormulaMaterialDto,
  ) {
    return this.materialService.create({ ...dto, formulaId });
  }

  @Get(':id/materials')
  @ApiOperation({ summary: 'List materials in formula' })
  findFormulaMaterials(@Param('id', ParseIntPipe) formulaId: number) {
    return this.materialService.findByFormula(formulaId);
  }

  @Put(':id/materials/:materialId')
  @ApiOperation({ summary: 'Update material dosage in formula' })
  updateDosage(
    @Param('materialId', ParseIntPipe) materialId: number,
    @Body() dto: { dosage: number; dosageLogic?: string },
  ) {
    return this.materialService.updateDosage(materialId, dto.dosage, dto.dosageLogic);
  }

  @Post(':id/logics')
  @ApiOperation({ summary: 'Add logic to formula' })
  createFormulaLogic(
    @Param('id', ParseIntPipe) formulaId: number,
    @Body() dto: CreateFormulaLogicDto,
  ) {
    return this.logicService.create({ ...dto, formulaId });
  }

  @Get(':id/logics')
  @ApiOperation({ summary: 'List logics for formula' })
  findFormulaLogics(@Param('id', ParseIntPipe) formulaId: number) {
    return this.logicService.findByFormula(formulaId);
  }
}
