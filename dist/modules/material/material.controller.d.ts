import { MaterialBaseService } from './sub-services/material-base.service';
import { MaterialSupplierService } from './sub-services/material-supplier.service';
import { MaterialEffectService } from './sub-services/material-effect.service';
import { MaterialClinicService } from './sub-services/material-clinic.service';
import { MaterialPatentService } from './sub-services/material-patent.service';
import { MaterialSafetyService } from './sub-services/material-safety.service';
import { CreateMaterialBaseDto, UpdateMaterialBaseDto, QueryMaterialDto, CreateMaterialSupplierDto, CreateMaterialEffectDto, CreateMaterialClinicDto, CreateMaterialPatentDto, CreateMaterialSafetyDto } from './dto/material.dto';
export declare class MaterialController {
    private baseService;
    private supplierService;
    private effectService;
    private clinicService;
    private patentService;
    private safetyService;
    constructor(baseService: MaterialBaseService, supplierService: MaterialSupplierService, effectService: MaterialEffectService, clinicService: MaterialClinicService, patentService: MaterialPatentService, safetyService: MaterialSafetyService);
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
    createSupplier(materialId: number, dto: CreateMaterialSupplierDto): Promise<{
        name: string;
        id: number;
        materialId: number;
        country: string | null;
        qualification: string | null;
        spec: string | null;
        price: number | null;
        priceDate: Date | null;
    }>;
    findSuppliers(materialId: number): Promise<{
        name: string;
        id: number;
        materialId: number;
        country: string | null;
        qualification: string | null;
        spec: string | null;
        price: number | null;
        priceDate: Date | null;
    }[]>;
    createEffect(materialId: number, dto: CreateMaterialEffectDto): Promise<{
        id: number;
        materialId: number;
        functionalComponent: string | null;
        componentContent: number | null;
        coreEffect: string | null;
        targetPoint: string | null;
    }>;
    findEffects(materialId: number): Promise<{
        id: number;
        materialId: number;
        functionalComponent: string | null;
        componentContent: number | null;
        coreEffect: string | null;
        targetPoint: string | null;
    }[]>;
    createClinic(materialId: number, dto: CreateMaterialClinicDto): Promise<{
        id: number;
        materialId: number;
        effectiveDosage: string | null;
        clinicType: string | null;
        clinicPopulation: string | null;
        clinicConclusion: string | null;
        literatureSource: string | null;
    }>;
    findClinics(materialId: number): Promise<{
        id: number;
        materialId: number;
        effectiveDosage: string | null;
        clinicType: string | null;
        clinicPopulation: string | null;
        clinicConclusion: string | null;
        literatureSource: string | null;
    }[]>;
    createPatent(materialId: number, dto: CreateMaterialPatentDto): Promise<{
        id: number;
        materialId: number;
        patentNo: string | null;
        patentType: string | null;
        patentCountry: string | null;
        marketStatus: string | null;
        competitorInfo: string | null;
    }>;
    findPatents(materialId: number): Promise<{
        id: number;
        materialId: number;
        patentNo: string | null;
        patentType: string | null;
        patentCountry: string | null;
        marketStatus: string | null;
        competitorInfo: string | null;
    }[]>;
    createSafety(materialId: number, dto: CreateMaterialSafetyDto): Promise<{
        id: number;
        materialId: number;
        safetyInfo: string | null;
        bioavailability: string | null;
        complianceStatus: string | null;
    }>;
    findSafety(materialId: number): Promise<{
        id: number;
        materialId: number;
        safetyInfo: string | null;
        bioavailability: string | null;
        complianceStatus: string | null;
    }[]>;
}
