import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class CreateLawBaseDto {
    name: string;
    country: string;
    effectiveDate?: string;
    scope?: string;
}
export declare class UpdateLawBaseDto {
    name?: string;
    country?: string;
    effectiveDate?: string;
    scope?: string;
}
export declare class QueryLawDto extends PaginationDto {
    name?: string;
    country?: string;
}
export declare class CreateLawMaterialDto {
    lawId?: number;
    materialId: number;
    complianceStatus?: string;
    limitDosage?: string;
    labelRequire?: string;
}
export declare class CreateLawUpdateDto {
    lawId?: number;
    updateDate?: string;
    updateContent?: string;
}
