import { Module } from '@nestjs/common';
import { ExportImportController } from './export-import.controller';
import { ExportService } from './export.service';
import { ImportService } from './import.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExportImportController],
  providers: [ExportService, ImportService],
  exports: [ExportService, ImportService],
})
export class ExportImportModule {}
