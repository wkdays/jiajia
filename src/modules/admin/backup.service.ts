import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BackupService {
  constructor(private prisma: PrismaService) {}

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    const [
      users,
      materials,
      healthProblems,
      formulas,
      laws,
      books,
      auditLogs,
    ] = await Promise.all([
      this.prisma.user.findMany(),
      this.prisma.materialBase.findMany(),
      this.prisma.healthBase.findMany(),
      this.prisma.formulaBase.findMany(),
      this.prisma.lawBase.findMany(),
      this.prisma.bookBase.findMany(),
      this.prisma.auditLog.findMany(),
    ]);

    const backup = {
      meta: {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        exportedBy: 'system',
      },
      data: {
        users,
        materials,
        healthProblems,
        formulas,
        laws,
        books,
        auditLogs,
      },
    };

    return {
      filename: `backup-${timestamp}.json`,
      content: JSON.stringify(backup, null, 2),
      contentType: 'application/json',
    };
  }

  async restoreFromBackup(backupContent: string) {
    const backup = JSON.parse(backupContent);
    
    if (!backup.data) {
      throw new Error('Invalid backup format');
    }

    // Note: In production, this would use transactions and handle conflicts
    // For now, we return a summary of what would be restored
    const summary = {
      users: backup.data.users?.length || 0,
      materials: backup.data.materials?.length || 0,
      healthProblems: backup.data.healthProblems?.length || 0,
      formulas: backup.data.formulas?.length || 0,
      laws: backup.data.laws?.length || 0,
      books: backup.data.books?.length || 0,
      auditLogs: backup.data.auditLogs?.length || 0,
    };

    return {
      restored: summary,
      message: 'Backup parsed successfully. Use individual import endpoints for actual restore.',
    };
  }
}
