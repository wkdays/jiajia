import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  async importFromCsv(
    entity: string,
    csvContent: string,
    fieldMapping?: Record<string, string>,
  ) {
    const rows = this.parseCsv(csvContent);
    if (rows.length === 0) {
      throw new BadRequestException('CSV file is empty');
    }

    const headers = rows[0];
    const data = rows.slice(1);

    const reverseMapping: Record<string, string> = {};
    if (fieldMapping) {
      for (const [entityField, csvHeader] of Object.entries(fieldMapping)) {
        reverseMapping[csvHeader.trim()] = entityField;
      }
    }

    let imported = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row.length === 1 && row[0] === '') continue;
      try {
        const record = this.mapRowToRecord(headers, row, reverseMapping);
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
      headers,
      mapping: reverseMapping,
      errors: errors.slice(0, 10),
    };
  }

  private parseCsv(content: string): string[][] {
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
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentCell += char;
      }
    }

    if (currentRow.length > 0 || currentCell !== '') {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }

    return rows;
  }

  private normalizeHeader(header: string): string {
    return header
      .trim()
      .replace(/\s+/g, '')
      .replace(/[()]/g, '（');
  }

  private mapRowToRecord(
    headers: string[],
    row: string[],
    reverseMapping: Record<string, string>,
  ): Record<string, any> {
    const record: Record<string, any> = {};
    headers.forEach((header, index) => {
      const value = row[index];
      if (value !== undefined) {
        let fieldName = reverseMapping[header];
        if (!fieldName) {
          const normalizedHeader = this.normalizeHeader(header);
          for (const [csvHeader, entityField] of Object.entries(reverseMapping)) {
            if (this.normalizeHeader(csvHeader) === normalizedHeader) {
              fieldName = entityField;
              break;
            }
          }
        }
        if (!fieldName) {
          fieldName = header;
        }
        record[fieldName] = value;
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
