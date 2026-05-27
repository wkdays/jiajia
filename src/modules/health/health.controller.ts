import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthBaseService } from './sub-services/health-base.service';
import { HealthMechanismService } from './sub-services/health-mechanism.service';
import { HealthCauseService } from './sub-services/health-cause.service';
import { HealthMaterialService } from './sub-services/health-material.service';
import {
  CreateHealthBaseDto,
  UpdateHealthBaseDto,
  QueryHealthDto,
  CreateHealthMechanismDto,
  CreateHealthCauseDto,
  CreateHealthMaterialDto,
} from './dto/health.dto';

@ApiTags('Health Problems')
@Controller('health-problems')
export class HealthController {
  constructor(
    private baseService: HealthBaseService,
    private mechanismService: HealthMechanismService,
    private causeService: HealthCauseService,
    private materialService: HealthMaterialService,
  ) {}

  // Health Base CRUD
  @Post()
  @ApiOperation({ summary: 'Create health problem' })
  create(@Body() dto: CreateHealthBaseDto) {
    return this.baseService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List health problems with pagination' })
  findAll(@Query() query: QueryHealthDto) {
    return this.baseService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get health problem detail' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update health problem' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHealthBaseDto) {
    return this.baseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete health problem' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.remove(id);
  }

  // Sub-entity routes
  @Post(':id/mechanisms')
  @ApiOperation({ summary: 'Add mechanism to health problem' })
  createMechanism(
    @Param('id', ParseIntPipe) healthId: number,
    @Body() dto: CreateHealthMechanismDto,
  ) {
    return this.mechanismService.create({ ...dto, healthId });
  }

  @Get(':id/mechanisms')
  @ApiOperation({ summary: 'List mechanisms for health problem' })
  findMechanisms(@Param('id', ParseIntPipe) healthId: number) {
    return this.mechanismService.findByHealth(healthId);
  }

  @Post(':id/causes')
  @ApiOperation({ summary: 'Add cause to health problem' })
  createCause(
    @Param('id', ParseIntPipe) healthId: number,
    @Body() dto: CreateHealthCauseDto,
  ) {
    return this.causeService.create({ ...dto, healthId });
  }

  @Get(':id/causes')
  @ApiOperation({ summary: 'List causes for health problem' })
  findCauses(@Param('id', ParseIntPipe) healthId: number) {
    return this.causeService.findByHealth(healthId);
  }

  @Post(':id/materials')
  @ApiOperation({ summary: 'Link material to health problem' })
  createHealthMaterial(
    @Param('id', ParseIntPipe) healthId: number,
    @Body() dto: CreateHealthMaterialDto,
  ) {
    return this.materialService.create({ ...dto, healthId });
  }

  @Get(':id/materials')
  @ApiOperation({ summary: 'List linked materials for health problem' })
  findHealthMaterials(@Param('id', ParseIntPipe) healthId: number) {
    return this.materialService.findByHealth(healthId);
  }
}
