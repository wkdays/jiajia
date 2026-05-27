import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialSafetyDto } from '../dto/material.dto';
export declare class MaterialSafetyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaterialSafetyDto): Promise<{
        id: number;
        materialId: number;
        safetyInfo: string | null;
        bioavailability: string | null;
        complianceStatus: string | null;
    }>;
    findByMaterial(materialId: number): Promise<{
        id: number;
        materialId: number;
        safetyInfo: string | null;
        bioavailability: string | null;
        complianceStatus: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        safetyInfo: string | null;
        bioavailability: string | null;
        complianceStatus: string | null;
    }>;
}
