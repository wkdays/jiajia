import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  async importFromCsv(entity: string, csvContent: string) {
    const rows = this.parseCsv(csvContent);
    if (rows.length === 0) {
      throw new BadRequestException('CSV file is empty');
    }

    const headers = rows[0];
    const data = rows.slice(1);

    let imported = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        const record = this.mapRowToRecord(headers, row);
        await this.createRecord(entity, record);
        imported++;
      } catch (error) {
        failed++;
        errors.push(`Row ${i + 2}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return {
      total: data.length,
      imported,
      failed,
      errors: errors.slice(0, 10), // Return first 10 errors
    };
  }

  private parseCsv(content: string): string[][] {
    // Remove BOM if present
    content = content.replace(/^\uFEFF/, '');

    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const nextChar = content[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentCell += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (currentCell !== '' || currentRow.length > 0) {
          currentRow.push(currentCell.trim());
          rows.push(currentRow);
          currentRow = [];
          currentCell = '';
        }
        if (char === '\r' && nextChar === '\n') {
          i++; // Skip \n after \r
        }
      } else {
        currentCell += char;
      }
    }

    // Push last cell/row
    if (currentCell !== '' || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }

    return rows;
  }

  private mapRowToRecord(headers: string[], row: string[]): Record<string, any> {
    const record: Record<string, any> = {};
    headers.forEach((header, index) => {
      const value = row[index];
      if (value !== undefined && value !== '') {
        record[header] = value;
      }
    });
    return record;
  }

  private async createRecord(entity: string, record: Record<string, any>) {
    switch (entity) {
      case 'material':
        await this.prisma.materialBase.create({
          data: {
            name: record.name,
            alias: record.alias || null,
            type: record.type || '其他',
            intro: record.intro || null,
            source: record.source || null,
          },
        });
        break;
      case 'health':
        await this.prisma.healthBase.create({
          data: {
            name: record.name,
            type: record.type || '其他',
            symptom: record.symptom || null,
          },
        });
        break;
      case 'law':
        await this.prisma.lawBase.create({
          data: {
            name: record.name,
            country: record.country || '未知',
            effectiveDate: record.effectiveDate ? new Date(record.effectiveDate) : undefined,
            scope: record.scope || null,
          },
        });
        break;
      default:
        throw new Error(`Unsupported import entity: ${entity}`);
    }
  }
}
