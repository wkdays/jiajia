import { PrismaService } from '../../prisma/prisma.service';
import { GenerateFormulaDto } from './dto/formula.dto';
export declare class FormulaGeneratorService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(dto: GenerateFormulaDto): Promise<({
        health: {
            name: string;
            id: number;
            type: string;
            createTime: Date;
            updateTime: Date;
            symptom: string | null;
        };
        materials: ({
            material: {
                name: string;
                id: number;
                type: string;
                alias: string | null;
                intro: string | null;
                source: string | null;
                createTime: Date;
                updateTime: Date;
            };
        } & {
            id: number;
            materialId: number;
            formulaId: number;
            dosage: number | null;
            dosageLogic: string | null;
        })[];
        logics: {
            id: number;
            formulaId: number;
            logicLine: string | null;
            effectSummary: string | null;
            complianceConclusion: string | null;
            tips: string | null;
        }[];
    } & {
        name: string;
        id: number;
        createTime: Date;
        healthId: number;
        targetPeople: string | null;
        targetCountry: string | null;
        createUser: string | null;
    }) | null>;
    private calculateDosage;
    private checkCompliance;
    private generateLogicLine;
    private generateEffectSummary;
    private generateTips;
}
