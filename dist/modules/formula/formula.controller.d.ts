import { FormulaBaseService } from './sub-services/formula-base.service';
import { FormulaMaterialService } from './sub-services/formula-material.service';
import { FormulaLogicService } from './sub-services/formula-logic.service';
import { FormulaGeneratorService } from './formula-generator.service';
import { CreateFormulaBaseDto, UpdateFormulaBaseDto, QueryFormulaDto, CreateFormulaMaterialDto, CreateFormulaLogicDto, GenerateFormulaDto } from './dto/formula.dto';
export declare class FormulaController {
    private baseService;
    private materialService;
    private logicService;
    private generatorService;
    constructor(baseService: FormulaBaseService, materialService: FormulaMaterialService, logicService: FormulaLogicService, generatorService: FormulaGeneratorService);
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
    createFormulaMaterial(formulaId: number, dto: CreateFormulaMaterialDto): Promise<{
        id: number;
        materialId: number;
        formulaId: number;
        dosage: number | null;
        dosageLogic: string | null;
    }>;
    findFormulaMaterials(formulaId: number): Promise<({
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
    updateDosage(materialId: number, dto: {
        dosage: number;
        dosageLogic?: string;
    }): Promise<{
        id: number;
        materialId: number;
        formulaId: number;
        dosage: number | null;
        dosageLogic: string | null;
    }>;
    createFormulaLogic(formulaId: number, dto: CreateFormulaLogicDto): Promise<{
        id: number;
        formulaId: number;
        logicLine: string | null;
        effectSummary: string | null;
        complianceConclusion: string | null;
        tips: string | null;
    }>;
    findFormulaLogics(formulaId: number): Promise<{
        id: number;
        formulaId: number;
        logicLine: string | null;
        effectSummary: string | null;
        complianceConclusion: string | null;
        tips: string | null;
    }[]>;
}
