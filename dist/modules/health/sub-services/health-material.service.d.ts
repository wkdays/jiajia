import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthMaterialDto } from '../dto/health.dto';
export declare class HealthMaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateHealthMaterialDto): Promise<{
        id: number;
        materialId: number;
        healthId: number;
        matchLogic: string | null;
    }>;
    findByHealth(healthId: number): Promise<({
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
    findByMaterial(materialId: number): Promise<({
        health: {
            name: string;
            id: number;
            type: string;
        };
    } & {
        id: number;
        materialId: number;
        healthId: number;
        matchLogic: string | null;
    })[]>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        healthId: number;
        matchLogic: string | null;
    }>;
}
