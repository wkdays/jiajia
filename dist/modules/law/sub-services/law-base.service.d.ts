import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLawBaseDto, UpdateLawBaseDto, QueryLawDto } from '../dto/law.dto';
export declare class LawBaseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateLawBaseDto): Promise<{
        name: string;
        id: number;
        country: string;
        effectiveDate: Date | null;
        scope: string | null;
    }>;
    findAll(query: QueryLawDto): Promise<{
        items: ({
            materialLinks: {
                id: number;
                materialId: number;
                complianceStatus: string | null;
                lawId: number;
                limitDosage: string | null;
                labelRequire: string | null;
            }[];
        } & {
            name: string;
            id: number;
            country: string;
            effectiveDate: Date | null;
            scope: string | null;
        })[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        materialLinks: ({
            material: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            materialId: number;
            complianceStatus: string | null;
            lawId: number;
            limitDosage: string | null;
            labelRequire: string | null;
        })[];
        updates: {
            id: number;
            lawId: number;
            updateDate: Date | null;
            updateContent: string | null;
        }[];
    } & {
        name: string;
        id: number;
        country: string;
        effectiveDate: Date | null;
        scope: string | null;
    }>;
    update(id: number, dto: UpdateLawBaseDto): Promise<{
        name: string;
        id: number;
        country: string;
        effectiveDate: Date | null;
        scope: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        country: string;
        effectiveDate: Date | null;
        scope: string | null;
    }>;
}
