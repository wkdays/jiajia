import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialBaseDto, UpdateMaterialBaseDto, QueryMaterialDto } from '../dto/material.dto';
export declare class MaterialBaseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaterialBaseDto): Promise<{
        name: string;
        id: number;
        type: string;
        alias: string | null;
        intro: string | null;
        source: string | null;
        createTime: Date;
        updateTime: Date;
    }>;
    findAll(query: QueryMaterialDto): Promise<{
        items: ({
            suppliers: {
                name: string;
                id: number;
                materialId: number;
                country: string | null;
                qualification: string | null;
                spec: string | null;
                price: number | null;
                priceDate: Date | null;
            }[];
            effects: {
                id: number;
                materialId: number;
                functionalComponent: string | null;
                componentContent: number | null;
                coreEffect: string | null;
                targetPoint: string | null;
            }[];
            safety: {
                id: number;
                materialId: number;
                safetyInfo: string | null;
                bioavailability: string | null;
                complianceStatus: string | null;
            }[];
        } & {
            name: string;
            id: number;
            type: string;
            alias: string | null;
            intro: string | null;
            source: string | null;
            createTime: Date;
            updateTime: Date;
        })[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        suppliers: {
            name: string;
            id: number;
            materialId: number;
            country: string | null;
            qualification: string | null;
            spec: string | null;
            price: number | null;
            priceDate: Date | null;
        }[];
        effects: {
            id: number;
            materialId: number;
            functionalComponent: string | null;
            componentContent: number | null;
            coreEffect: string | null;
            targetPoint: string | null;
        }[];
        clinics: {
            id: number;
            materialId: number;
            effectiveDosage: string | null;
            clinicType: string | null;
            clinicPopulation: string | null;
            clinicConclusion: string | null;
            literatureSource: string | null;
        }[];
        patents: {
            id: number;
            materialId: number;
            patentNo: string | null;
            patentType: string | null;
            patentCountry: string | null;
            marketStatus: string | null;
            competitorInfo: string | null;
        }[];
        safety: {
            id: number;
            materialId: number;
            safetyInfo: string | null;
            bioavailability: string | null;
            complianceStatus: string | null;
        }[];
        healthLinks: ({
            health: {
                name: string;
                id: number;
                type: string;
                createTime: Date;
                updateTime: Date;
                symptom: string | null;
            };
        } & {
            id: number;
            materialId: number;
            healthId: number;
            matchLogic: string | null;
        })[];
    } & {
        name: string;
        id: number;
        type: string;
        alias: string | null;
        intro: string | null;
        source: string | null;
        createTime: Date;
        updateTime: Date;
    }>;
    update(id: number, dto: UpdateMaterialBaseDto): Promise<{
        name: string;
        id: number;
        type: string;
        alias: string | null;
        intro: string | null;
        source: string | null;
        createTime: Date;
        updateTime: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        type: string;
        alias: string | null;
        intro: string | null;
        source: string | null;
        createTime: Date;
        updateTime: Date;
    }>;
    removeBatch(ids: number[]): Promise<{
        deleted: number;
    }>;
}
