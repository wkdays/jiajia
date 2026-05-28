import { PrismaService } from '../../prisma/prisma.service';
export declare class ImportService {
    private prisma;
    constructor(prisma: PrismaService);
    importFromCsv(entity: string, csvContent: string, fieldMapping?: Record<string, string>): Promise<{
        total: number;
        imported: number;
        failed: number;
        headers: string[];
        mapping: Record<string, string>;
        errors: string[];
    }>;
    private parseCsv;
    private normalizeHeader;
    private mapRowToRecord;
    private createRecord;
}
