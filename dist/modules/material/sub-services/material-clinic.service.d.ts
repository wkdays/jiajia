import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialClinicDto } from '../dto/material.dto';
export declare class MaterialClinicService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaterialClinicDto): Promise<{
        id: number;
        materialId: number;
        effectiveDosage: string | null;
        clinicType: string | null;
        clinicPopulation: string | null;
        clinicConclusion: string | null;
        literatureSource: string | null;
    }>;
    findByMaterial(materialId: number): Promise<{
        id: number;
        materialId: number;
        effectiveDosage: string | null;
        clinicType: string | null;
        clinicPopulation: string | null;
        clinicConclusion: string | null;
        literatureSource: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        effectiveDosage: string | null;
        clinicType: string | null;
        clinicPopulation: string | null;
        clinicConclusion: string | null;
        literatureSource: string | null;
    }>;
}
