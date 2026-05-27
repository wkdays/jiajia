import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class CreateHealthBaseDto {
    name: string;
    type: string;
    symptom?: string;
}
export declare class UpdateHealthBaseDto {
    name?: string;
    type?: string;
    symptom?: string;
}
export declare class QueryHealthDto extends PaginationDto {
    name?: string;
    type?: string;
}
export declare class CreateHealthMechanismDto {
    healthId?: number;
    pathogenesis?: string;
    coreTarget?: string;
    pathway?: string;
}
export declare class CreateHealthCauseDto {
    healthId?: number;
    internalCause?: string;
    externalCause?: string;
    highRiskGroup?: string;
}
export declare class CreateHealthMaterialDto {
    healthId?: number;
    materialId: number;
    matchLogic?: string;
}
