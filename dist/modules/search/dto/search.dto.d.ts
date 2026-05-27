import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class GlobalSearchDto extends PaginationDto {
    query: string;
    entities?: string[];
}
export declare class AdvancedFilterDto extends PaginationDto {
    entity?: string;
    name?: string;
    category?: string;
    country?: string;
    healthId?: number;
    materialId?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}
