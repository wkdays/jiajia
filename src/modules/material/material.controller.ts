import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MaterialBaseService } from './sub-services/material-base.service';
import { MaterialSupplierService } from './sub-services/material-supplier.service';
import { MaterialEffectService } from './sub-services/material-effect.service';
import { MaterialClinicService } from './sub-services/material-clinic.service';
import { MaterialPatentService } from './sub-services/material-patent.service';
import { MaterialSafetyService } from './sub-services/material-safety.service';
import {
  CreateMaterialBaseDto,
  UpdateMaterialBaseDto,
  QueryMaterialDto,
  CreateMaterialSupplierDto,
  CreateMaterialEffectDto,
  CreateMaterialClinicDto,
  CreateMaterialPatentDto,
  CreateMaterialSafetyDto,
} from './dto/material.dto';

@ApiTags('Materials')
@Controller('materials')
export class MaterialController {
  constructor(
    private baseService: MaterialBaseService,
    private supplierService: MaterialSupplierService,
    private effectService: MaterialEffectService,
    private clinicService: MaterialClinicService,
    private patentService: MaterialPatentService,
    private safetyService: MaterialSafetyService,
  ) {}

  // Material Base CRUD
  @Post()
  @ApiOperation({ summary: 'Create material' })
  create(@Body() dto: CreateMaterialBaseDto) {
    return this.baseService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List materials with pagination' })
  findAll(@Query() query: QueryMaterialDto) {
    return this.baseService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get material detail' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update material' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMaterialBaseDto) {
    return this.baseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete material' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.remove(id);
  }

  // Sub-entity routes
  @Post(':id/suppliers')
  @ApiOperation({ summary: 'Add supplier to material' })
  createSupplier(
    @Param('id', ParseIntPipe) materialId: number,
    @Body() dto: CreateMaterialSupplierDto,
  ) {
    return this.supplierService.create({ ...dto, materialId });
  }

  @Get(':id/suppliers')
  @ApiOperation({ summary: 'List suppliers for material' })
  findSuppliers(@Param('id', ParseIntPipe) materialId: number) {
    return this.supplierService.findByMaterial(materialId);
  }

  @Post(':id/effects')
  @ApiOperation({ summary: 'Add effect to material' })
  createEffect(
    @Param('id', ParseIntPipe) materialId: number,
    @Body() dto: CreateMaterialEffectDto,
  ) {
    return this.effectService.create({ ...dto, materialId });
  }

  @Get(':id/effects')
  @ApiOperation({ summary: 'List effects for material' })
  findEffects(@Param('id', ParseIntPipe) materialId: number) {
    return this.effectService.findByMaterial(materialId);
  }

  @Post(':id/clinics')
  @ApiOperation({ summary: 'Add clinic data to material' })
  createClinic(
    @Param('id', ParseIntPipe) materialId: number,
    @Body() dto: CreateMaterialClinicDto,
  ) {
    return this.clinicService.create({ ...dto, materialId });
  }

  @Get(':id/clinics')
  @ApiOperation({ summary: 'List clinic data for material' })
  findClinics(@Param('id', ParseIntPipe) materialId: number) {
    return this.clinicService.findByMaterial(materialId);
  }

  @Post(':id/patents')
  @ApiOperation({ summary: 'Add patent to material' })
  createPatent(
    @Param('id', ParseIntPipe) materialId: number,
    @Body() dto: CreateMaterialPatentDto,
  ) {
    return this.patentService.create({ ...dto, materialId });
  }

  @Get(':id/patents')
  @ApiOperation({ summary: 'List patents for material' })
  findPatents(@Param('id', ParseIntPipe) materialId: number) {
    return this.patentService.findByMaterial(materialId);
  }

  @Post(':id/safety')
  @ApiOperation({ summary: 'Add safety data to material' })
  createSafety(
    @Param('id', ParseIntPipe) materialId: number,
    @Body() dto: CreateMaterialSafetyDto,
  ) {
    return this.safetyService.create({ ...dto, materialId });
  }

  @Get(':id/safety')
  @ApiOperation({ summary: 'List safety data for material' })
  findSafety(@Param('id', ParseIntPipe) materialId: number) {
    return this.safetyService.findByMaterial(materialId);
  }
}
