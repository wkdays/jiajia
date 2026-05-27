import { HealthBaseService } from './sub-services/health-base.service';
import { HealthMechanismService } from './sub-services/health-mechanism.service';
import { HealthCauseService } from './sub-services/health-cause.service';
import { HealthMaterialService } from './sub-services/health-material.service';
import { CreateHealthBaseDto, UpdateHealthBaseDto, QueryHealthDto, CreateHealthMechanismDto, CreateHealthCauseDto, CreateHealthMaterialDto } from './dto/health.dto';
export declare class HealthController {
    private baseService;
    private mechanismService;
    private causeService;
    private materialService;
    constructor(baseService: HealthBaseService, mechanismService: HealthMechanismService, causeService: HealthCauseService, materialService: HealthMaterialService);
    create(dto: CreateHealthBaseDto): Promise<{
        name: string;
        id: number;
        type: string;
        createTime: Date;
        updateTime: Date;
        symptom: string | null;
    }>;
    findAll(query: QueryHealthDto): Promise<{
        items: ({
            mechanisms: {
                id: number;
                healthId: number;
                pathogenesis: string | null;
                coreTarget: string | null;
                pathway: string | null;
            }[];
            causes: {
                id: number;
                healthId: number;
                internalCause: string | null;
                externalCause: string | null;
                highRiskGroup: string | null;
            }[];
            materialLinks: ({
                material: {
                    name: string;
                    id: number;
                    alias: string | null;
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
            createTime: Date;
            updateTime: Date;
            symptom: string | null;
        })[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        formulas: {
            name: string;
            id: number;
            createTime: Date;
            healthId: number;
            targetPeople: string | null;
            targetCountry: string | null;
            createUser: string | null;
        }[];
        mechanisms: {
            id: number;
            healthId: number;
            pathogenesis: string | null;
            coreTarget: string | null;
            pathway: string | null;
        }[];
        causes: {
            id: number;
            healthId: number;
            internalCause: string | null;
            externalCause: string | null;
            highRiskGroup: string | null;
        }[];
        materialLinks: ({
            material: {
                name: string;
                id: number;
                type: string;
                alias: string | null;
                intro: string | null;
                source: string | null;
                createTime: Date;
                updateTime: Date;
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
        createTime: Date;
        updateTime: Date;
        symptom: string | null;
    }>;
    update(id: number, dto: UpdateHealthBaseDto): Promise<{
        name: string;
        id: number;
        type: string;
        createTime: Date;
        updateTime: Date;
        symptom: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        type: string;
        createTime: Date;
        updateTime: Date;
        symptom: string | null;
    }>;
    createMechanism(healthId: number, dto: CreateHealthMechanismDto): Promise<{
        id: number;
        healthId: number;
        pathogenesis: string | null;
        coreTarget: string | null;
        pathway: string | null;
    }>;
    findMechanisms(healthId: number): Promise<{
        id: number;
        healthId: number;
        pathogenesis: string | null;
        coreTarget: string | null;
        pathway: string | null;
    }[]>;
    createCause(healthId: number, dto: CreateHealthCauseDto): Promise<{
        id: number;
        healthId: number;
        internalCause: string | null;
        externalCause: string | null;
        highRiskGroup: string | null;
    }>;
    findCauses(healthId: number): Promise<{
        id: number;
        healthId: number;
        internalCause: string | null;
        externalCause: string | null;
        highRiskGroup: string | null;
    }[]>;
    createHealthMaterial(healthId: number, dto: CreateHealthMaterialDto): Promise<{
        id: number;
        materialId: number;
        healthId: number;
        matchLogic: string | null;
    }>;
    findHealthMaterials(healthId: number): Promise<({
        material: {
            name: string;
            id: number;
            type: string;
            alias: string | null;
        };
    } & {
        id: number;
        materialId: number;
        healthId: number;
        matchLogic: string | null;
    })[]>;
}
