import { LawBaseService } from './sub-services/law-base.service';
import { LawMaterialService } from './sub-services/law-material.service';
import { LawUpdateService } from './sub-services/law-update.service';
import { CreateLawBaseDto, UpdateLawBaseDto, QueryLawDto, CreateLawMaterialDto, CreateLawUpdateDto } from './dto/law.dto';
export declare class LawController {
    private baseService;
    private materialService;
    private updateService;
    constructor(baseService: LawBaseService, materialService: LawMaterialService, updateService: LawUpdateService);
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
    createLawMaterial(lawId: number, dto: CreateLawMaterialDto): Promise<{
        id: number;
        materialId: number;
        complianceStatus: string | null;
        lawId: number;
        limitDosage: string | null;
        labelRequire: string | null;
    }>;
    findLawMaterials(lawId: number): Promise<({
        material: {
            name: string;
            id: number;
            alias: string | null;
        };
    } & {
        id: number;
        materialId: number;
        complianceStatus: string | null;
        lawId: number;
        limitDosage: string | null;
        labelRequire: string | null;
    })[]>;
    createLawUpdate(lawId: number, dto: CreateLawUpdateDto): Promise<{
        id: number;
        lawId: number;
        updateDate: Date | null;
        updateContent: string | null;
    }>;
    findLawUpdates(lawId: number): Promise<{
        id: number;
        lawId: number;
        updateDate: Date | null;
        updateContent: string | null;
    }[]>;
}
