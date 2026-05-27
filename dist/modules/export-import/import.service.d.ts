import { PrismaService } from '../../prisma/prisma.service';
export declare class ImportService {
    private prisma;
    constructor(prisma: PrismaService);
    importFromCsv(entity: string, csvContent: string): Promise<{
        total: number;
        imported: number;
        failed: number;
        errors: string[];
    }>;
    private parseCsv;
    private mapRowToRecord;
    private createRecord;
}
