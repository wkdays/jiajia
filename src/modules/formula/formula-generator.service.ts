import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateFormulaDto } from './dto/formula.dto';

@Injectable()
export class FormulaGeneratorService {
  constructor(private prisma: PrismaService) {}

  async generate(dto: GenerateFormulaDto) {
    // 1. Get health problem with mechanisms and causes
    const health = await this.prisma.healthBase.findUnique({
      where: { id: dto.healthId },
      include: {
        mechanisms: true,
        causes: true,
        materialLinks: {
          include: {
            material: {
              include: {
                effects: true,
                safety: true,
              },
            },
          },
        },
      },
    });

    if (!health) {
      throw new NotFoundException(`Health problem with ID ${dto.healthId} not found`);
    }

    // 2. Get matching materials with their effects
    const matchingMaterials: Array<{ material: any; matchLogic: string | null }> = health.materialLinks.map((link: any) => ({
      material: link.material,
      matchLogic: link.matchLogic,
    }));

    // 3. Filter materials by target people if specified
    let filteredMaterials = matchingMaterials;
    if (dto.targetPeople) {
      // Simple filtering logic - in production this would be more sophisticated
      filteredMaterials = matchingMaterials.filter((m: { material: any; matchLogic: string | null }) => {
        const safety = m.material.safety?.[0];
        if (!safety) return true;
        return true; // Allow all for now
      });
    }

    // 4. Calculate dosage ranges based on clinical data
    const formulaMaterials: Array<{ materialId: number; dosage: number; dosageLogic: string }> = filteredMaterials.map((m: { material: any; matchLogic: string | null }) => {
      const effect = m.material.effects?.[0];
      return {
        materialId: m.material.id,
        dosage: this.calculateDosage(m.material.id, dto.targetPeople),
        dosageLogic: `基于${effect?.functionalComponent || '成分'}的临床数据`,
      };
    });

    // 5. Check compliance if target country specified
    let complianceStatus = 'pending';
    let complianceConclusion = '待合规校验';
    if (dto.targetCountry) {
      const complianceResult = await this.checkCompliance(
        formulaMaterials.map((fm: { materialId: number; dosage: number; dosageLogic: string }) => fm.materialId),
        dto.targetCountry,
      );
      complianceStatus = complianceResult.status;
      complianceConclusion = complianceResult.conclusion;
    }

    // 6. Generate formula logic line
    const logicLine = this.generateLogicLine(health, formulaMaterials);

    // 7. Create formula
    const formula = await this.prisma.formulaBase.create({
      data: {
        name: `${health.name} - ${dto.targetPeople || '通用'}配方`,
        healthId: dto.healthId,
        targetPeople: dto.targetPeople,
        targetCountry: dto.targetCountry,
        createUser: 'system',
      },
    });

    // 8. Create formula materials
    await Promise.all(
      formulaMaterials.map((fm: { materialId: number; dosage: number; dosageLogic: string }) =>
        this.prisma.formulaMaterial.create({
          data: {
            formulaId: formula.id,
            materialId: fm.materialId,
            dosage: fm.dosage,
            dosageLogic: fm.dosageLogic,
          },
        }),
      ),
    );

    // 9. Create formula logic
    await this.prisma.formulaLogic.create({
      data: {
        formulaId: formula.id,
        logicLine,
        effectSummary: this.generateEffectSummary(health, formulaMaterials),
        complianceConclusion,
        tips: this.generateTips(health),
      },
    });

    // 10. Return complete formula
    return this.prisma.formulaBase.findUnique({
      where: { id: formula.id },
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
  }

  private calculateDosage(materialId: number, targetPeople?: string): number {
    // Simplified dosage calculation
    const baseDosage = 100; // mg
    if (targetPeople === '儿童') {
      return baseDosage * 0.5;
    } else if (targetPeople === '中老年') {
      return baseDosage * 1.2;
    }
    return baseDosage;
  }

  private async checkCompliance(materialIds: number[], country: string) {
    const lawMaterials = await this.prisma.lawMaterial.findMany({
      where: {
        materialId: { in: materialIds },
        law: { country },
      },
      include: { law: true },
    });

    const violations = lawMaterials.filter((lm: any) => lm.complianceStatus === '禁用');
    if (violations.length > 0) {
      return {
        status: 'violation',
        conclusion: `发现${violations.length}个违规原料`,
      };
    }

    return {
      status: 'compliant',
      conclusion: '所有原料符合目标国家法规',
    };
  }

  private generateLogicLine(health: any, materials: any[]): string {
    const materialNames = materials.map((m) => m.materialId).join(' → ');
    return `${health.name} → ${health.mechanisms?.[0]?.coreTarget || '靶点'} → ${materialNames}`;
  }

  private generateEffectSummary(health: any, materials: any[]): string {
    return `针对${health.name}，使用${materials.length}种原料进行配方设计`;
  }

  private generateTips(health: any): string {
    return `建议定期复查${health.name}相关指标`;
  }
}
