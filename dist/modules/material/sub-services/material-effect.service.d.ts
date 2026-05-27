import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialEffectDto } from '../dto/material.dto';
export declare class MaterialEffectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaterialEffectDto): Promise<{
        id: number;
        materialId: number;
        functionalComponent: string | null;
        componentContent: number | null;
        coreEffect: string | null;
        targetPoint: string | null;
    }>;
    findByMaterial(materialId: number): Promise<{
        id: number;
        materialId: number;
        functionalComponent: string | null;
        componentContent: number | null;
        coreEffect: string | null;
        targetPoint: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        functionalComponent: string | null;
        componentContent: number | null;
        coreEffect: string | null;
        targetPoint: string | null;
    }>;
}
