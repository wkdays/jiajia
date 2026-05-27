import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFormulaMaterialDto } from '../dto/formula.dto';
export declare class FormulaMaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFormulaMaterialDto): Promise<{
        id: number;
        materialId: number;
        formulaId: number;
        dosage: number | null;
        dosageLogic: string | null;
    }>;
    findByFormula(formulaId: number): Promise<({
        material: {
            name: string;
            id: number;
            alias: string | null;
        };
    } & {
        id: number;
        materialId: number;
        formulaId: number;
        dosage: number | null;
        dosageLogic: string | null;
    })[]>;
    updateDosage(id: number, dosage: number, dosageLogic?: string): Promise<{
        id: number;
        materialId: number;
        formulaId: number;
        dosage: number | null;
        dosageLogic: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        formulaId: number;
        dosage: number | null;
        dosageLogic: string | null;
    }>;
}
