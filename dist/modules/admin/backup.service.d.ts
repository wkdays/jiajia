import { PrismaService } from '../../prisma/prisma.service';
export declare class BackupService {
    private prisma;
    constructor(prisma: PrismaService);
    createBackup(): Promise<{
        filename: string;
        content: string;
        contentType: string;
    }>;
    restoreFromBackup(backupContent: string): Promise<{
        restored: {
            users: any;
            materials: any;
            healthProblems: any;
            formulas: any;
            laws: any;
            books: any;
            auditLogs: any;
        };
        message: string;
    }>;
}
