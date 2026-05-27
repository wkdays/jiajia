import type { Response } from 'express';
import { ExportService } from './export.service';
import { ImportService } from './import.service';
import { ExportDto } from './dto/export-import.dto';
export declare class ExportImportController {
    private exportService;
    private importService;
    constructor(exportService: ExportService, importService: ImportService);
    exportEntity(entity: string, dto: ExportDto, res: Response): Promise<void>;
    exportFormulaReport(id: number, res: Response): Promise<void>;
    exportSuppliers(materialId: number, mask: string, res: Response): Promise<void>;
    importEntity(entity: string, csvContent: string): Promise<{
        total: number;
        imported: number;
        failed: number;
        errors: string[];
    }>;
}
