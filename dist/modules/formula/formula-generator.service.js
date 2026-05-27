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
exports.FormulaGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FormulaGeneratorService = class FormulaGeneratorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(dto) {
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
            throw new common_1.NotFoundException(`Health problem with ID ${dto.healthId} not found`);
        }
        const matchingMaterials = health.materialLinks.map((link) => ({
            material: link.material,
            matchLogic: link.matchLogic,
        }));
        let filteredMaterials = matchingMaterials;
        if (dto.targetPeople) {
            filteredMaterials = matchingMaterials.filter((m) => {
                const safety = m.material.safety?.[0];
                if (!safety)
                    return true;
                return true;
            });
        }
        const formulaMaterials = filteredMaterials.map((m) => {
            const effect = m.material.effects?.[0];
            return {
                materialId: m.material.id,
                dosage: this.calculateDosage(m.material.id, dto.targetPeople),
                dosageLogic: `基于${effect?.functionalComponent || '成分'}的临床数据`,
            };
        });
        let complianceStatus = 'pending';
        let complianceConclusion = '待合规校验';
        if (dto.targetCountry) {
            const complianceResult = await this.checkCompliance(formulaMaterials.map((fm) => fm.materialId), dto.targetCountry);
            complianceStatus = complianceResult.status;
            complianceConclusion = complianceResult.conclusion;
        }
        const logicLine = this.generateLogicLine(health, formulaMaterials);
        const formula = await this.prisma.formulaBase.create({
            data: {
                name: `${health.name} - ${dto.targetPeople || '通用'}配方`,
                healthId: dto.healthId,
                targetPeople: dto.targetPeople,
                targetCountry: dto.targetCountry,
                createUser: 'system',
            },
        });
        await Promise.all(formulaMaterials.map((fm) => this.prisma.formulaMaterial.create({
            data: {
                formulaId: formula.id,
                materialId: fm.materialId,
                dosage: fm.dosage,
                dosageLogic: fm.dosageLogic,
            },
        })));
        await this.prisma.formulaLogic.create({
            data: {
                formulaId: formula.id,
                logicLine,
                effectSummary: this.generateEffectSummary(health, formulaMaterials),
                complianceConclusion,
                tips: this.generateTips(health),
            },
        });
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
    calculateDosage(materialId, targetPeople) {
        const baseDosage = 100;
        if (targetPeople === '儿童') {
            return baseDosage * 0.5;
        }
        else if (targetPeople === '中老年') {
            return baseDosage * 1.2;
        }
        return baseDosage;
    }
    async checkCompliance(materialIds, country) {
        const lawMaterials = await this.prisma.lawMaterial.findMany({
            where: {
                materialId: { in: materialIds },
                law: { country },
            },
            include: { law: true },
        });
        const violations = lawMaterials.filter((lm) => lm.complianceStatus === '禁用');
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
    generateLogicLine(health, materials) {
        const materialNames = materials.map((m) => m.materialId).join(' → ');
        return `${health.name} → ${health.mechanisms?.[0]?.coreTarget || '靶点'} → ${materialNames}`;
    }
    generateEffectSummary(health, materials) {
        return `针对${health.name}，使用${materials.length}种原料进行配方设计`;
    }
    generateTips(health) {
        return `建议定期复查${health.name}相关指标`;
    }
};
exports.FormulaGeneratorService = FormulaGeneratorService;
exports.FormulaGeneratorService = FormulaGeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FormulaGeneratorService);
//# sourceMappingURL=formula-generator.service.js.map