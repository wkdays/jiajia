import { Controller, Get, Post, Query, Body, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { ImportService } from './import.service';
import { ExportDto, ImportDto } from './dto/export-import.dto';

@ApiTags('Export / Import')
@Controller('export-import')
export class ExportImportController {
  constructor(
    private exportService: ExportService,
    private importService: ImportService,
  ) {}

  @Get('export/:entity')
  @ApiOperation({ summary: 'Export entity data to CSV' })
  async exportEntity(
    @Param('entity') entity: string,
    @Query() dto: ExportDto,
    @Res() res: Response,
  ) {
    const result = await this.exportService.exportToCsv(entity, dto.ids);
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.content);
  }

  @Get('export/formula/:id/report')
  @ApiOperation({ summary: 'Export formula report as HTML' })
  async exportFormulaReport(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const result = await this.exportService.exportFormulaReport(id);
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.content);
  }

  @Get('export/materials/:id/suppliers')
  @ApiOperation({ summary: 'Export material suppliers with optional price masking' })
  async exportSuppliers(
    @Param('id', ParseIntPipe) materialId: number,
    @Query('mask') mask: string,
    @Res() res: Response,
  ) {
    const result = await this.exportService.exportSuppliers(materialId, mask === 'true');
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.content);
  }

  @Post('import/:entity')
  @ApiOperation({ summary: 'Import entity data from CSV' })
  @ApiConsumes('text/csv')
  async importEntity(
    @Param('entity') entity: string,
    @Body('csvContent') csvContent: string,
    @Body('fieldMapping') fieldMapping?: Record<string, string>,
  ) {
    return this.importService.importFromCsv(entity, csvContent, fieldMapping);
  }
}
