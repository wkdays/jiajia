import { PrismaService } from '../../prisma/prisma.service';
export declare class ExportService {
    private prisma;
    constructor(prisma: PrismaService);
    exportToCsv(entity: string, ids?: number[]): Promise<{
        filename: string;
        content: string;
        contentType: string;
    }>;
    exportFormulaReport(formulaId: number): Promise<{
        filename: string;
        content: string;
        contentType: string;
    }>;
    private convertToCsv;
    exportSuppliers(materialId: number, maskPrices?: boolean): Promise<{
        filename: string;
        content: string;
        contentType: string;
    }>;
    private generateHtmlReport;
}
