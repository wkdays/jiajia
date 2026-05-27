import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFormulaLogicDto } from '../dto/formula.dto';
export declare class FormulaLogicService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFormulaLogicDto): Promise<{
        id: number;
        formulaId: number;
        logicLine: string | null;
        effectSummary: string | null;
        complianceConclusion: string | null;
        tips: string | null;
    }>;
    findByFormula(formulaId: number): Promise<{
        id: number;
        formulaId: number;
        logicLine: string | null;
        effectSummary: string | null;
        complianceConclusion: string | null;
        tips: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        formulaId: number;
        logicLine: string | null;
        effectSummary: string | null;
        complianceConclusion: string | null;
        tips: string | null;
    }>;
}
