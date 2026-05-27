import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MaskUtil } from '../../common/utils/mask.util';

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  async exportToCsv(entity: string, ids?: number[]) {
    let data: any[] = [];
    let headers: string[] = [];

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

  async exportFormulaReport(formulaId: number) {
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

    // Generate a structured report object that can be formatted as HTML/PDF/Word
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
      materials: formula.materials.map((fm: any) => ({
        name: fm.material.name,
        dosage: fm.dosage,
        dosageLogic: fm.dosageLogic,
        type: fm.material.type,
      })),
      logics: formula.logics.map((fl: any) => ({
        logicLine: fl.logicLine,
        effectSummary: fl.effectSummary,
        complianceConclusion: fl.complianceConclusion,
        tips: fl.tips,
      })),
    };

    // Return as HTML for now - can be converted to PDF/Word by frontend
    const html = this.generateHtmlReport(report);

    return {
      filename: `formula-report-${formula.id}.html`,
      content: html,
      contentType: 'text/html; charset=utf-8',
    };
  }

  private convertToCsv(data: any[], headers: string[]): string {
    if (data.length === 0) return headers.join(',') + '\n';

    const rows = data.map((item) => {
      return headers
        .map((header) => {
          const value = item[header];
          if (value === null || value === undefined) return '';
          const str = String(value);
          // Escape quotes and wrap in quotes if contains comma or newline
          if (str.includes(',') || str.includes('\n') || str.includes('"')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(',');
    });

    return '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
  }

  async exportSuppliers(materialId: number, maskPrices = false) {
    const suppliers = await this.prisma.materialSupplier.findMany({
      where: { materialId },
    });

    const headers = ['id', 'materialId', 'name', 'country', 'qualification', 'spec', 'price', 'priceDate'];

    const data = suppliers.map((s: any) => ({
      ...s,
      price: maskPrices && s.price ? MaskUtil.maskPrice(s.price) : s.price,
    }));

    const csv = this.convertToCsv(data, headers);
    return {
      filename: `suppliers-${materialId}-export-${new Date().toISOString().split('T')[0]}.csv`,
      content: csv,
      contentType: 'text/csv; charset=utf-8',
    };
  }

  private generateHtmlReport(report: any): string {
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
${report.materials.map((m: any) => `<tr><td>${m.name}</td><td>${m.dosage || 'N/A'}mg</td><td>${m.dosageLogic || 'N/A'}</td><td>${m.type}</td></tr>`).join('')}
</table>

<h2>配方逻辑</h2>
${report.logics.map((l: any) => `
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
}
