import { PrismaService } from '../../prisma/prisma.service';
import { GlobalSearchDto, AdvancedFilterDto } from './dto/search.dto';
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    globalSearch(dto: GlobalSearchDto): Promise<{
        query: string;
        entities: string[];
        totalCount: number;
        results: any;
        pagination: {
            page: number;
            pageSize: number;
        };
    }>;
    advancedFilter(dto: AdvancedFilterDto): Promise<{
        entity: string;
        items: {
            name: string;
            id: number;
            type: string;
            alias: string | null;
            intro: string | null;
            source: string | null;
            createTime: Date;
            updateTime: Date;
        }[];
        pagination: {
            page: number | undefined;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    } | {
        entity: string;
        items: {
            name: string;
            id: number;
            type: string;
            createTime: Date;
            updateTime: Date;
            symptom: string | null;
        }[];
        pagination: {
            page: number | undefined;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    } | {
        entity: string;
        items: ({
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
        })[];
        pagination: {
            page: number | undefined;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    } | {
        entity: string;
        items: {
            name: string;
            id: number;
            country: string;
            effectiveDate: Date | null;
            scope: string | null;
        }[];
        pagination: {
            page: number | undefined;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    private filterMaterials;
    private filterHealthProblems;
    private filterFormulas;
    private filterLaws;
    getAggregations(): Promise<{
        counts: {
            materials: number;
            healthProblems: number;
            formulas: number;
            laws: number;
            books: number;
        };
        materialByCategory: {
            type: any;
            count: any;
        }[];
        formulaByCountry: {
            country: any;
            count: any;
        }[];
        lawByCountry: {
            country: any;
            count: any;
        }[];
    }>;
}
