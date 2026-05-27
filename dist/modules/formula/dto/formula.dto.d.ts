import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class CreateFormulaBaseDto {
    name: string;
    healthId: number;
    targetPeople?: string;
    targetCountry?: string;
    createUser?: string;
}
export declare class UpdateFormulaBaseDto {
    name?: string;
    targetPeople?: string;
    targetCountry?: string;
}
export declare class QueryFormulaDto extends PaginationDto {
    name?: string;
    healthId?: number;
}
export declare class CreateFormulaMaterialDto {
    formulaId?: number;
    materialId: number;
    dosage?: number;
    dosageLogic?: string;
}
export declare class CreateFormulaLogicDto {
    formulaId?: number;
    logicLine?: string;
    effectSummary?: string;
    complianceConclusion?: string;
    tips?: string;
}
export declare class GenerateFormulaDto {
    healthId: number;
    targetPeople?: string;
    targetCountry?: string;
}
