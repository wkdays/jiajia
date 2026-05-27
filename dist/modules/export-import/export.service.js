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
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const mask_util_1 = require("../../common/utils/mask.util");
let ExportService = class ExportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportToCsv(entity, ids) {
        let data = [];
        let headers = [];
        switch (entity) {
            case 'material':
                data = await this.prisma.materialBase.findMany({
                    where: ids ? { id: { in: ids } } : {},
                });
                headers = ['id', 'name', 'alias', 'type', 'intro', 'source', 'createTime', 'updateTime'];
                break;
            case 'health':
                data = await this.prisma.healthBase.findMany({
                    where: ids ? { id: { in: ids } } : {},
                });
                headers = ['id', 'name', 'type', 'symptom', 'createTime', 'updateTime'];
                break;
            case 'formula':
                data = await this.prisma.formulaBase.findMany({
                    where: ids ? { id: { in: ids } } : {},
                    include: {
                        health: { select: { name: true } },
                        materials: {
                            include: {
                                material: { select: { name: true } },
                            },
                        },
                    },
                });
                headers = ['id', 'name', 'healthName', 'targetPeople', 'targetCountry', 'createUser'];
                break;
            case 'law':
                data = await this.prisma.lawBase.findMany({
                    where: ids ? { id: { in: ids } } : {},
                });
                headers = ['id', 'name', 'country', 'effectiveDate', 'scope'];
                break;
            default:
                throw new Error(`Unsupported export entity: ${entity}`);
        }
        const csv = this.convertToCsv(data, headers);
        return {
            filename: `${entity}-export-${new Date().toISOString().split('T')[0]}.csv`,
            content: csv,
            contentType: 'text/csv; charset=utf-8',
        };
    }
    async exportFormulaReport(formulaId) {
        const formula = await this.prisma.formulaBase.findUnique({
            where: { id: formulaId },
            include: {
                health: true,
                materials: {
                    include: {
                        material: true,
                    },
                },
                logics: true,
            },
        });
        if (!formula) {
            throw new Error(`Formula with ID ${formulaId} not found`);
        }
        const report = {
            title: `配方报告: ${formula.name}`,
            generatedAt: new Date().toISOString(),
            formula: {
                id: formula.id,
                name: formula.name,
                targetPeople: formula.targetPeople,
                targetCountry: formula.targetCountry,
                createUser: formula.createUser,
            },
            healthProblem: formula.health,
            materials: formula.materials.map((fm) => ({
                name: fm.material.name,
                dosage: fm.dosage,
                dosageLogic: fm.dosageLogic,
                type: fm.material.type,
            })),
            logics: formula.logics.map((fl) => ({
                logicLine: fl.logicLine,
                effectSummary: fl.effectSummary,
                complianceConclusion: fl.complianceConclusion,
                tips: fl.tips,
            })),
        };
        const html = this.generateHtmlReport(report);
        return {
            filename: `formula-report-${formula.id}.html`,
            content: html,
            contentType: 'text/html; charset=utf-8',
        };
    }
    convertToCsv(data, headers) {
        if (data.length === 0)
            return headers.join(',') + '\n';
        const rows = data.map((item) => {
            return headers
                .map((header) => {
                const value = item[header];
                if (value === null || value === undefined)
                    return '';
                const str = String(value);
                if (str.includes(',') || str.includes('\n') || str.includes('"')) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            })
                .join(',');
        });
        return '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    }
    async exportSuppliers(materialId, maskPrices = false) {
        const suppliers = await this.prisma.materialSupplier.findMany({
            where: { materialId },
        });
        const headers = ['id', 'materialId', 'name', 'country', 'qualification', 'spec', 'price', 'priceDate'];
        const data = suppliers.map((s) => ({
            ...s,
            price: maskPrices && s.price ? mask_util_1.MaskUtil.maskPrice(s.price) : s.price,
        }));
        const csv = this.convertToCsv(data, headers);
        return {
            filename: `suppliers-${materialId}-export-${new Date().toISOString().split('T')[0]}.csv`,
            content: csv,
            contentType: 'text/csv; charset=utf-8',
        };
    }
    generateHtmlReport(report) {
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${report.title}</title>
<style>
body { font-family: Arial, sans-serif; margin: 40px; }
h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
h2 { color: #555; margin-top: 30px; }
table { width: 100%; border-collapse: collapse; margin-top: 15px; }
th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
th { background-color: #f5f5f5; font-weight: bold; }
.meta { color: #666; margin-bottom: 20px; }
</style>
</head>
<body>
<h1>${report.title}</h1>
<p class="meta">生成时间: ${report.generatedAt}</p>

<h2>配方基本信息</h2>
<table>
<tr><th>名称</th><td>${report.formula.name}</td></tr>
<tr><th>目标人群</th><td>${report.formula.targetPeople || '通用'}</td></tr>
<tr><th>目标国家</th><td>${report.formula.targetCountry || '未指定'}</td></tr>
<tr><th>创建人</th><td>${report.formula.createUser || '系统'}</td></tr>
</table>

<h2>健康问题</h2>
<table>
<tr><th>名称</th><td>${report.healthProblem?.name || 'N/A'}</td></tr>
<tr><th>类型</th><td>${report.healthProblem?.type || 'N/A'}</td></tr>
</table>

<h2>原料组成</h2>
<table>
<tr><th>原料名称</th><th>剂量</th><th>剂量逻辑</th><th>类型</th></tr>
${report.materials.map((m) => `<tr><td>${m.name}</td><td>${m.dosage || 'N/A'}mg</td><td>${m.dosageLogic || 'N/A'}</td><td>${m.type}</td></tr>`).join('')}
</table>

<h2>配方逻辑</h2>
${report.logics.map((l) => `
<div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
<p><strong>逻辑链:</strong> ${l.logicLine || 'N/A'}</p>
<p><strong>效果总结:</strong> ${l.effectSummary || 'N/A'}</p>
<p><strong>合规结论:</strong> ${l.complianceConclusion || 'N/A'}</p>
<p><strong>提示:</strong> ${l.tips || 'N/A'}</p>
</div>
`).join('')}

</body>
</html>`;
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExportService);
//# sourceMappingURL=export.service.js.map