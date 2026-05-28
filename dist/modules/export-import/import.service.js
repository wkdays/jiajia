"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ImportService = class ImportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importFromCsv(entity, csvContent, fieldMapping) {
        const rows = this.parseCsv(csvContent);
        if (rows.length === 0) {
            throw new common_1.BadRequestException('CSV file is empty');
        }
        const headers = rows[0];
        const data = rows.slice(1);
        const reverseMapping = {};
        if (fieldMapping) {
            for (const [entityField, csvHeader] of Object.entries(fieldMapping)) {
                reverseMapping[csvHeader.trim()] = entityField;
            }
        }
        let imported = 0;
        let failed = 0;
        const errors = [];
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (row.length === 1 && row[0] === '')
                continue;
            try {
                const record = this.mapRowToRecord(headers, row, reverseMapping);
                await this.createRecord(entity, record);
                imported++;
            }
            catch (error) {
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
    parseCsv(content) {
        content = content.replace(/^\uFEFF/, '');
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let inQuotes = false;
        for (let i = 0; i < content.length; i++) {
            const char = content[i];
            const nextChar = content[i + 1];
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentCell += '"';
                    i++;
                }
                else {
                    inQuotes = !inQuotes;
                }
            }
            else if (char === ',' && !inQuotes) {
                currentRow.push(currentCell.trim());
                currentCell = '';
            }
            else if ((char === '\n' || char === '\r') && !inQuotes) {
                currentRow.push(currentCell.trim());
                rows.push(currentRow);
                currentRow = [];
                currentCell = '';
                if (char === '\r' && nextChar === '\n') {
                    i++;
                }
            }
            else {
                currentCell += char;
            }
        }
        if (currentRow.length > 0 || currentCell !== '') {
            currentRow.push(currentCell.trim());
            rows.push(currentRow);
        }
        return rows;
    }
    normalizeHeader(header) {
        return header
            .trim()
            .replace(/\s+/g, '')
            .replace(/[()]/g, '（');
    }
    mapRowToRecord(headers, row, reverseMapping) {
        const record = {};
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
    async createRecord(entity, record) {
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
};
exports.ImportService = ImportService;
exports.ImportService = ImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImportService);
//# sourceMappingURL=import.service.js.map