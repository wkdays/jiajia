import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class CreateMaterialBaseDto {
    name: string;
    alias?: string;
    type: string;
    intro?: string;
    source?: string;
}
export declare class UpdateMaterialBaseDto {
    name?: string;
    alias?: string;
    type?: string;
    intro?: string;
    source?: string;
}
export declare class QueryMaterialDto extends PaginationDto {
    name?: string;
    type?: string;
}
export declare class CreateMaterialSupplierDto {
    materialId?: number;
    name: string;
    country?: string;
    qualification?: string;
    spec?: string;
    price?: number;
}
export declare class CreateMaterialEffectDto {
    materialId?: number;
    functionalComponent?: string;
    componentContent?: number;
    coreEffect?: string;
    targetPoint?: string;
}
export declare class CreateMaterialClinicDto {
    materialId?: number;
    effectiveDosage?: string;
    clinicType?: string;
    clinicPopulation?: string;
    clinicConclusion?: string;
    literatureSource?: string;
}
export declare class CreateMaterialPatentDto {
    materialId?: number;
    patentNo?: string;
    patentType?: string;
    patentCountry?: string;
    marketStatus?: string;
    competitorInfo?: string;
}
export declare class CreateMaterialSafetyDto {
    materialId?: number;
    safetyInfo?: string;
    bioavailability?: string;
    complianceStatus?: string;
}
