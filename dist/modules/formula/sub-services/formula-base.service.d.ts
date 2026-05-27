import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFormulaBaseDto, UpdateFormulaBaseDto, QueryFormulaDto } from '../dto/formula.dto';
export declare class FormulaBaseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFormulaBaseDto): Promise<{
        health: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        id: number;
        createTime: Date;
        healthId: number;
        targetPeople: string | null;
        targetCountry: string | null;
        createUser: string | null;
    }>;
    findAll(query: QueryFormulaDto): Promise<{
        items: ({
            health: {
                name: string;
                id: number;
            };
            materials: ({
                material: {
                    name: string;
                    id: number;
                };
            } & {
                id: number;
                materialId: number;
                formulaId: number;
                dosage: number | null;
                dosageLogic: string | null;
            })[];
        } & {
            name: string;
            id: number;
            createTime: Date;
            healthId: number;
            targetPeople: string | null;
            targetCountry: string | null;
            createUser: string | null;
        })[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, dto: UpdateFormulaBaseDto): Promise<{
        name: string;
        id: number;
        createTime: Date;
        healthId: number;
        targetPeople: string | null;
        targetCountry: string | null;
        createUser: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        createTime: Date;
        healthId: number;
        targetPeople: string | null;
        targetCountry: string | null;
        createUser: string | null;
    }>;
}
